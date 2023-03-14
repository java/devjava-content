const { watch, series, src, dest } = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var fs = require('fs');
var frontMatter = require('gulp-front-matter');
var toc = require('gulp-markdown-toc');
var markdown = require('gulp-markdown');
var wrap = require('gulp-wrap');
var swig = require('gulp-swig');
var data = require('gulp-data');
var browserSync = require('browser-sync').create();
const { DateTime } = require("luxon");

const slugs = new Map();
var tutorials = {};
var links = {};
var link_map = new Map();
var link_title_map = new Map();
const updates = []

var javadoc = require('./app/data/javadoc.json')

function copy_assets() {
    return src("app/assets/**/*.*")
        .pipe(dest("site/assets"));
}


function copy_favicon() {
    return src("app/favicon.ico")
        .pipe(dest("site"));
}

function sassify() {
    return src("app/scss/*.scss")
        .pipe(sass())
        .pipe(dest("site/assets/css"));
}

function pre_process_pages() {
    slugs.clear()
    tutorials = { "tutorials": {} }
    links = { "links": {} }
    updates.length = 0

    return src('app/pages/**/*.md', { silent: false, debug: false })
        // Frontmatter processing: Attaches frontmatter to data object as data.fm
        .pipe(frontMatter({
            property: 'fm',
            remove: true
        }))
        .pipe(data(function (file) {
            if (file.fm.title) file.fm.title_html = markdown.marked.parseInline(file.fm.title)
            if (file.fm.description) file.fm.description_html = markdown.marked(file.fm.description)
        }))

        .pipe(data(function (file) {

            const type = file.fm.type;

            if (is_tutorial(file)) {
                const category = file.fm.category
                const category_order = file.fm.category_order
                const title = file.fm.title
                const title_html = file.fm.title_html
                const description = file.fm.description
                const description_html = file.fm.description_html
                const group = file.fm.group
                const id = file.fm.id

                if (!file.fm.slug) {
                    console.log("Tutorial page " + id + " doesn't have a slug");
                }

                const path = generate_url_structure(file).newrelative.replace(".md", ".html")

                const tutorial_json = { title, title_html, path, description, description_html, group, category_order }

                // Create the link_map to be used later for custom linking in markdown files
                if (file.fm.id) {
                    link_map.set(file.fm.id, path);
                }
                link_title_map.set(path, title);

                elements = path.split("/").filter(element => element.length > 0);
                if (path.endsWith("/")) {
                    elements[elements.length - 1] += "/";
                }
                links = [];
                for (i = 0; i < elements.length - 1; i++) {
                    link = elements.slice(0, i + 1).join("/") + "/";
                    links.push(link);
                }

                link_titles = [];
                for (link of links) {
                    link_title = link_title_map.get(link);
                    if (link_title) {
                        link_json = { link, link_title };
                        link_titles.push(link_json);
                    }
                }

                // Create a map by category
                if (type == "tutorial") {
                    if (tutorials["tutorials"][category]) {
                        tutorials["tutorials"][category].push(tutorial_json);
                    } else {
                        tutorials["tutorials"][category] = [tutorial_json];
                    }
                }

                // Create a map by group
                if (group) {
                    if (!tutorials["tutorials"][group]) {
                        tutorials["tutorials"][group] = [];
                    }
                    if (type == "tutorial-group") {
                        tutorials["tutorials"][group].push(tutorial_json);
                    } else if (type == "tutorial") {
                        tutorials["tutorials"][group]["parent_link"] = path;
                        tutorials["tutorials"][group]["parent_title"] = file.fm.title;
                        tutorials["tutorials"][group]["parent_title_html"] = file.fm.title_html;
                    }
                    tutorials["tutorials"][group][id] = [];
                    tutorials["tutorials"][group][id]["breadcrumb"] = link_titles;
                }
            }

            if (file.fm.other_links) {
                const group = file.fm.group
                if (!tutorials["tutorials"][group]["doc_links"]) {
                    tutorials["tutorials"][group]["doc_links"] = [];
                }
                if (!tutorials["tutorials"][group]["related_pages"]) {
                    tutorials["tutorials"][group]["related_pages"] = [];
                }
                for (let link of file.fm.other_links) {

                    let link_id = link.match(/doc:([\w|\.|-]+)/);
                    if (link_id != null && javadoc[link_id[1]]) {
                        let processedLink = processDocLink(javadoc[link_id[1]]["link"]);
                        let text = javadoc[link_id[1]]["text"]
                        tutorials["tutorials"][group]["doc_links"].push({
                            "path": processedLink,
                            "title_html": text
                        })
                    }
                    let page_id = link.match(/related_page:([\w|\.|-]+)/);
                    if (page_id != null && link_map.get(page_id[1])) {
                        let linkPath = link_map.get(page_id[1])
                        let title = link_title_map.get(linkPath)

                        tutorials["tutorials"][group]["related_pages"].push({
                            "path": linkPath,
                            "title_html": title
                        })
                    }
                }
            }

        }))

        // create list of recent updates
        .pipe(data(function (file) {
            if (file.fm.last_update)
                updates.push({
                    date: file.fm.last_update,
                    date_text: DateTime
                        .fromJSDate(file.fm.last_update)
                        .setLocale('en-us')
                        .toLocaleString(DateTime.DATE_FULL),
                    title: file.fm.title_html,
                    description: file.fm.description_html,
                    path: generate_url_structure(file).newrelative.replace(".md", ".html"),
                    aria_label: file.fm.aria_label
                })
        }))
}


function pages() {
    // sort updates by date with latest (largest) date first
    updates.sort((left, right) => right.date - left.date)

    const renderer = {
        link(href, title, text) {
            let processedHref = href;

            // Markdown includes link to another dev.java page
            if (href.includes("id:")) {
                let page_id = href.match(/id:([\w|\.|-]+)/);
                if (page_id != null) {
                    let anchor = href.match(/#[\w|-]+/);
                    var link = '';
                    let page_link = link_map.get(page_id[1]);
                    processedHref = "/" + page_link;

                    if (processedHref.includes("undefined")) {
                        console.log("Page " + page_id[1] + " resolved to undefined");
                    }

                    if (anchor) {
                        processedHref = processedHref + anchor;
                    }
                } else {
                    console.log("Null page id link for href " + href);
                }
            }

            // Markdown includes a link to a javadoc entry
            if (href.includes("javadoc:")) {
                let javadoc_id = href.match(/javadoc:([\w\.\-(),]+)/)
                if (javadoc_id != null) {
                    processedHref = processDocLink(javadoc["javadoc_root"] + javadoc[javadoc_id[1]]);
                    if (processedHref.includes("undefined")) {
                        console.log("Javadoc " + javadoc_id[1] + " resolved to undefined");
                    }
                    return `<a href="${processedHref}" target="_blank" rel="noopener noreferrer">${text}</a>`;
                }
            }

            // Markdown includes a link to a doc entry (w/o Javadoc base URL)
            if (href.includes("doc:")) {
                let doc_id = href.match(/doc:([\w\.\-(),]+)/);

                if (doc_id != null) {
                    // If this is a javadoc entry that contains additional link title information,
                    // otherwise use the old format with just a link.
                    if (javadoc[doc_id[1]]["text"] != null) {
                        processedHref = processDocLink("" + javadoc[doc_id[1]]["link"])
                    } else {
                        processedHref = processDocLink("" + javadoc[doc_id[1]])
                    }

                    if (processedHref.includes("undefined")) {
                        console.log("Doc " + doc_id[1] + " resolved to undefined");
                    }
                    return `<a href="${processedHref}" target="_blank" rel="noopener noreferrer">${text}</a>`;
                }
            }



            if (title) {
                link = `<a href="${processedHref}" title="${title}">${text}</a>`;
            } else {
                link = `<a href="${processedHref}">${text}</a>`;
            }

            return link;
        },
        heading(text, level, raw, slugger) {
            const richHeader = parseRichHeader(text)
            text = richHeader.text

            // the following code is an edited version of the original renderer at
            // https://github.com/markedjs/marked/blob/master/src/Renderer.js#L49-L64
            if (this.options.headerIds) {
                const slug = richHeader.slug ?? this.options.headerPrefix + slugger.slug(raw)
                return '<h'
                    + level
                    + ' id="'
                    + slug
                    + '">'
                    + text
                    + '</h'
                    + level
                    + '>\n';
            }
            // ignore IDs
            return '<h' + level + '>' + text + '</h' + level + '>\n';
        }
    };

    markdown.marked.use({
        headerIds: true,
        headerPrefix: ''
    });

    markdown.marked.use({ renderer });

    var mystream = src('app/pages/**/*.md', { silent: false, debug: false })

        // Frontmatter processing: Attaches frontmatter to data object as data.fm
        .pipe(frontMatter({
            property: 'fm',
            remove: true
        }))

        .pipe(data(function (file) {
            if (file.fm.title) file.fm.title_html = markdown.marked.parseInline(file.fm.title)
            if (file.fm.description) file.fm.description_html = markdown.marked(file.fm.description)
        }))

        .pipe(data(process_last_update))

        .pipe(data(function (file) {
            generate_url_structure(file);
            guarantee_unique_url(file);
        }))

        // Take JSON data and pipe to swig() which sets the data object
        .pipe(data(function () {
            return tutorials
        }))
        // create a table of contents and attach the JSON representation to the front matter
        .pipe(toc())

        .pipe(data(function (file) {
            if (file.fm.toc) {
                // process manual toc
                const section_name_regex = /^[\s|\w|/|,]+[^{|^\s{]+/;
                const anchor_regex = /{([^{|^}]+)}/;
                file.fm.toc = file.fm.toc
                    .map(entry => ({
                        sectionName: entry.match(section_name_regex)[0],
                        anchorsArray: entry.match(anchor_regex)
                    }))
                    .map(({ sectionName, anchorsArray }, index) => ({
                        text: sectionName,
                        html: sectionName,
                        slug: (anchorsArray == null || anchorsArray.length == 0) ? `anchor_${index + 1}` : anchorsArray[1]
                    }))
            } else {
                // use automatic toc
                file.fm.toc = file.toc.json
                    .filter(entry => entry.lvl === 2)
                    .map(entry => {
                        const richHeader = parseRichHeader(entry.content)
                        return {
                            text: richHeader.text,
                            html: richHeader.html,
                            slug: richHeader.slug ?? entry.slug
                        }
                    })
            }

            if (file.fm.more_learning) {
                file.fm.toc.push({
                    text: "More Learning",
                    html: "More Learning",
                    slug: "more-learning"
                });
            }
        }))

        .pipe(data(function () {
            let data = {}
            data.env = process.env;
            data.updates = updates

            return data;
        }))

        .pipe(swig({ defaults: { cache: false } }))

        // Markdown processing
        .pipe(markdown())

        .pipe(wrap(function (data) {
            return fs.readFileSync('app/templates/pages/' + data.file.fm.layout).toString()
        }, null, { engine: 'nunjucks' }))

        // Create redirects for the slug_history
        .pipe(data(function (file) {
            if (file.fm.slug_history) {
                file.fm.slug_history.forEach(slug => {
                    let newFilePath = file.cwd + "/site/" + slug + "/index.html";
                    let content = "<meta http-equiv=\"refresh\" content=\"0; url=/" + file.fm.slug + "/\" />\n"
                    content += "<link rel=\"canonical\" href=\"https://dev.java/" + file.fm.slug + "/\" />"

                    writeFile(newFilePath, content, err => {
                        if (err) {
                            console.error(err);
                        }
                    });
                })
            }
        }))

        .pipe(dest('site'))

        // Stream to browser for hot reload capability
        .pipe(browserSync.stream());

    return mystream;
}


function processDocLink(link) {
    return link.replace("@@CURRENT_RELEASE@@", javadoc[`current_release`]);
}


// helper function to recursively create directories that don't exist -- for writing slug history
var getDirName = require('path').dirname;
function writeFile(path, contents, cb) {
    fs.mkdir(getDirName(path), { recursive: true }, function (err) {
        if (err) return cb(err);
        fs.writeFile(path, contents, cb);
    });
}

function is_tutorial(file) {
    return file.fm.type == "tutorial" || file.fm.type == "tutorial-group";
}


function serve(done) {
    browserSync.init({
        server: {
            baseDir: './site/'
        }
    });

    watch("app/**/*.md", {}, series(build));
    watch("app/**/*.html", {}, series(build));
    watch("app/scss/*.scss", {}, series(build));
    watch("site/**/", {}, browserSync.reload());
    done();
}

function cleanup() {
    return del([
        'site'
    ]);
}


function process_last_update(file) {
    const update = file.fm.last_update ?? new Date("2021-09-14")
    const review = file.fm.last_review
    const showReview = review && update < review

    const type = showReview ? "review" : "update"
    const date = DateTime
        .fromJSDate(showReview ? review : update)
        .setLocale('en-us')
        .toLocaleString(DateTime.DATE_FULL)
    file.fm.last_update = { type, date }
}

function parseRichHeader(header) {
    // A rich header starts with the title text followed by an optional config in curly braces that defines a custom anchor/slug.

    // A bit more formal:
    //  - full header = "$text $config?" (i.e. " $config" is optional)
    //  - with $config = "{#$slug}"
    // Curly braces can show up in the text as long as the closing "}" is not the last character.

    // Fully formal in this beautiful regex:
    const parsed = header.match(/^(?<text>.*[^\}]) ?(?<config>\{#(?<slug>.+)\})?$/)
    if (parsed === null)
        throw new Error(`Illegal header "${header}" - check gulpfile.js for details.`)

    return {
        ...parsed.groups,
        html: markdown.marked.parseInline(parsed.groups.text)
    }
}

function generate_url_structure(file) {
    // If there's a slug, make it that
    if (file.fm.slug) {
        file.basename = "index.html";
        file.dirname = file.cwd + "/app/pages/" + file.fm.slug;
        file.newrelative = file.fm.slug + "/";
    } else {
        // Matches digits and then underscore (ie. `12_` in `12_this_page.md`)
        const reg = /^\d+_/g;

        file.basename = file.basename.replace(reg, "");

        const olddir = file.dirname.split('\\').join('/');
        const newdir = olddir.split('/').map(element => element.replace(reg, "")).join('/');
        file.dirname = newdir;

        const oldrelative = file.relative.split('\\').join('/')
        const newrelative = oldrelative.split('/').map(element => element.replace(reg, "")).join('/');
        file.newrelative = newrelative
    }

    return file;
}

function guarantee_unique_url(file) {
    if (slugs.get(file.newrelative))
        throw new Error(`Duplicate slug "${file.newrelative}". Check files "${file.history[0]}" and "${slugs.get(file.newrelative)}".`)
    slugs.set(file.newrelative, file.history[0])
}



var build = series(cleanup, copy_assets, copy_favicon, sassify, pre_process_pages, pages);
var deploy = series(cleanup, build);

// local development only (by typing `gulp`)
exports.default = series(build, serve);


// Export for use at the command line
exports.serve = serve;
exports.pages = pages;
exports.clean = cleanup;
exports.build = build;
exports.deploy = deploy;

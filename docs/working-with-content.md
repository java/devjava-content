# Working with Dev.java Content

Here are some notes on how Dev.java pages are organized and how the system sorts the pages to render them into HTML.

Working on content should be mostly done in Markdown files under the /app/pages directory.



## Content Types

### Single Page Tutorial

A single-page tutorial, probably the most common on the site, although tutorial series are also popular. 

Example: [Getting Started with Java](/app/pages/learn/01_tutorial/01_your-first-java-app/01_getting-started-with-java.md?plain=1)


### Tutorial Series

A multi-tutorial series with a guide at the top that walks you through the series.

There are two components to a series, the series page, and the actual tutorial pages.

Tutorial series example: [Language Basics Folder](/app/pages/learn/01_tutorial/03_getting-to-know-the-language/02_basics)

Series page example: [Language Basics](/app/pages/learn/01_tutorial/03_getting-to-know-the-language/02_basics/00_language-basics.md?plain=1)

First tutorial in series: [Language Basics: Creating Variables](/app/pages/learn/01_tutorial/03_getting-to-know-the-language/02_basics/01_creating-variables.md?plain=1)

Second tutorial in series: [Language Basics: Primitive Types](/app/pages/learn/01_tutorial/03_getting-to-know-the-language/02_basics/02_creating-primitive-types.md?plain=1)

- All tutorials in a series have the `group` field in the markdown
- The series page is of type and layout `tutorial`
- The actual tutorials in the series are type and layout of `tutorial-group`.


### Non-tutorial page

Example: [Duke Home](/app/pages/community/duke/index.md?plain=1)





## Content Frontmatter

Frontmatter is the heart of how content is processed. Here is an example of a pages frontmatter with descriptions below.

```markdown
---
id: lang.lambda.comparators
title: Writing and Combining Comparators
slug: learn/lambdas/writing-comparators
slug_history:
- learn/writing-and-combining-comparators
type: tutorial-group
group: lambdas
layout: learn/tutorial-group.html
subheader_select: tutorials
main_css_id: learn
more_learning: 
  youtube:
  - lFbBI85oTnY
toc: 
- Implementing a Comparator with a Lambda Expression {implementing}
- Using a Factory Method to Create a Comparator {creating-comparators-with-a-factory}
description: "Creating and Combining Comparators Using Lambda Expressions."
last_update: 2021-10-26
---
```

- `title`: this is the title displayed at the top of the page
- `type`: this has to have the value `tutorial`. If it does not, then this page will not appear under any category. 
- `category`: the name of the category this page belongs to. 
- `layout`: this has to have the value `learn/tutorial.html`. 
- `sidemenu` and `main_css_id`: you do not need to touch these.
- `description`: the description displayed on the main page. 
- `slug` [optional]: (see below)
- `slug_history`: Slug history can now be used to ensure we don't break Internet links.For each item in the slug_history, a redirect to the current slug will be created.
- `more_learning` [optional]: 
- `toc` [optional]: The table of contents used for the sidebar on tutorial pages. If you do not include this, the system will try and autobuild it from the content.
- `last_update`: (see below)
- `last_review`: (see below)


### id

It is alphanumeric, and can contain `.`. Meaning, any sequence of characters, as opposed to just a number. The problem with a number is finding the last number and incrementing it would be next to impossible, so when you create a new page, just give it something random. Because you can put `.` in it, you can also create IDs with a namespace, like `stream.intro`. I tried to use the first few characters of the page title followed by some randoms stuff, to give it a little more randomness. We can probably improve this, but once id's are set, any subsequent links will also be set.


### slug


Page by default will generate their URL using the frontmatter `title` tag. So. If the title is "Getting Started with Java" this will turn into https://dev.java/learn/getting-started-with-java. There's some added magic to clean up extraneous characters `[,?``]`.

If they have the slug tag, that'll take precedence.

Note: Currently we are using ahrefs.com to generate a daily report that includes broken links on the deployed site. This should be sufficient for awhile until we add a custom CI step in. That said, ahrefs has a lot of other nice stuff so we might just keep using it.


### last_update and last_review dates

We want readers to see that the articles are well-maintained and up to date.
To that end, there are two relevant frontmatter entries that both take dates in the format `YYYY-MM-DD`:

* `last_review`: most recent date when the article was read (at least mostly) and possibly slightly edited
* `last_update`: most recent date when the article's content got updated or expanded (including creation)

Please update these entries accordingly.
That means, when reading an article and either nodding along or doing some slight edits, update `last_review`.
When writing a new article or changing an article's content, for example to update a section to a new feature or add a new section, update `last_update`.

The most recent of the two dates is picked to be displayed below the article.
Furthermore, the `last_update` entry is used to populate the "Recently Updated Articles" section on the landing page.
So when new articles get added, make sure to set the current date, so they show up there and get some exposure. :)




## Top Level Entries

There are 7 entries on the tutorial welcome page: 

- Running Your First Java Application
- Staying Aware of New Features
- Getting to Know the Language
- Mastering the API
- Organizing your Application
- Getting to know the JVM
- References

These 7 entries are hard-coded in the `template/pages/learn/index.html` page. A page is displayed under an entry on this page if it is a `tutorial` page that has the right `category` defined in its front matter.

| Entry                               | category     |
|-------------------------------------|--------------|
| Running Your First Java Application | `learn`      |
| Staying Aware of New Features       | `awareness`  |
| Getting to Know the Language        | `language`   |
| Mastering the API                   | `api`        |
| Organizing your Application         | `organizing` |
| Getting to know the JVM             | `jvm`        |

Note that the Reference part is not a category. It is written in the `index.md` file, under the `learn` directory. Making it a category would also make it a separate page, and the links currently displayed directly on this page would be on this other page.


## Adding a Category Under an Existing Entry

There are two types of categories: 

- Categories that are made of just one page, like _Getting Started with Java_.
- Categories that are made of several, linked pages, like _Getting to Know the Language/Basics_. 


### Adding a Single Page Category

This is the simplest case: you just need to create a basic `.md` file an add a frontmatter to it. In fact you do not need to do that, just copy / paste and existing one and apply the modifications you need. 

Here is the front matter of the _Getting Started with Java_ page (just the first two entries of the table of content have been reproduced). 

```
---
title: Getting Started with Java
type: tutorial
category: start
layout: learn/tutorial.html
subheader_select: tutorials
main_css_id: learn
toc:
- Elements of a Java Application
- Compiling and Executing a Java Code
description: "Creating your first Java application."
---
```


Then the table of content follows. You can put any level of section or subsection there. This will create a navigation menu on the right of the page. You need to add anchors to the section of the table of content for the links of this menu to work. Make sure the anchors are correctly numbered or the menu will not work. 


### Adding a Category Made of Several Pages

A category made of several pages is a group category. It is displayed as a single link under the entry. This link leads to a page with all the pages of the group. 

There is a specific navigation on a page that it part of a group: you can navigate to the next and previous pages directly. 

You can put all the markdown files of a category under the same folder. This folder must contain a technical page that holds all the links to the pages of the group, and that has a special front matter.


#### Defining a Group of Pages

A group of pages in linked from a _group page_ markdown page that has specific elements in its front matter. 

Here is the front matter for the page `00_language-basics.md`: 

```
---
title: "Java Language Basics"
category: language
type: tutorial
group: language-basics
layout: learn/tutorial-group-top.html
category_order: 1
subheader_select: tutorials
main_css_id: learn
description: "Getting to know the basics of the Java language."
---

This part of the tutorial covers the basics of the language, including: variables, operators, expressions, statements, blocks and control flow statements.
```

The `type` of this page is `tutorial`, so it will be displayed on the `learn` page under the entry _Getting to Know the Language_. 

It defines a `group` named `language-basics`. 

Its `description` is displayed on the `learn` page. The text is displayed on the page it links to, along with links to all the pages of this category. 

Note that the `layout` of this page is `learn/tutorial-group-top.html`. 


#### Adding a Page to a Group

To make a page part of a group, you need three elements in the front matter: 

```
type: tutorial-group
group: language-basics
layout: learn/tutorial-group.html
```

The value of the `group` is of course the name of the group this page belongs to. 

Because the `type` is  `tutorial-group`, this page is not displayed on the Learn page. 

### Ordering Categories

If a category is composed of single pages, then the order of the pages on the file system is the order of the pages in the category. See also the section on URL Generation. 

If you have groups of several pages in a category, then the order may vary with the file system: you may end up with the directories, then the files. 

You can force the order of pages and group of pages by using a field in the front matter: `category_order`. If this field is present in the single pages and in the group page, then it will be used to sort the elements. 


## Linking

### Creating links to an internal page

Once an ID exists, that page can be linked to from other markdown files using the standard markdown approach with a little magic... instead of `Here is a [link](/learn/tutorials/some/long/url/)`, you do it like this: `Here is a [link](id:abc123)` where `abc123` is the id tag associated with the destination page.

### Linking to headers

The Markdown processor automatically adds IDs to the headers by "slugifying" their name (i.e. all lower case, spaces replaced by `-`, most other special characters removed).
To customize that ID, you can append the header text with curly braces that contain the custom slug, which must start with a `#`, for example:

```
## This is a header {#header}
```

While the header text can still contain curly braces, it can't _end_ with a closing curly brace, or that will be interpreted as an effort to override the anchor, which is only legal if it strictly adheres by the syntax above.
Otherwise an author mistake is assumed and an error thrown.

To link to a header, attach `#` followed by the header's ID to the link, be it a regular one or one that uses the ID approach described above.
("Slugified" means all lower case as well as spaces and most other special characters replaced by `-`.)
For example, to link to the _The Unary Operators_ header in the article _Using Operators in Your Programs_, which has the ID `lang.basics.operators`, write `++ is probably Java's most famous [unary operator](id:lang.basics.operators#the-unary-operators).`

### Creating links to the Javadoc

The available links to the Javadoc must be declared in the `javadoc.json` file. This file contains key/value pairs, with keys rendered as values in the URL generation mechanism.

To create a link to a specific Javadoc page, you can use the following:

```text
You should read the page about the [`File`](javadoc:File) class.
```

A key named `File` must be present in the `javadoc.json` file for the link to be properly rendered.

We could create more sets of links to other resources on this model, with some other prefix.

This is truly glorious. In my most humble opinion.



## URL Generation

You can see that the sorting of the pages on the site may rely on the order of the corresponding files on the file system, or can be overridden with the `category_order` front matter field. 

So far, the markdown pages have been arranged on the file system as they appear on the site, by using a numeric prefix on the folder and file names. 

The system generates URL from the paths of the markdown files, removing everything that is before the `_` character. So the file `learn/01_your-first-java-app/03_jshell.md` is available under the URL `learn/your-first-java-app/jshell.html`.  




## Tutorial Series Overview Pages

The overview pages have a special status among the pages. They are marked with the `type: tutorial` frontmatter field. These pages are used to generate a table of content per group. The group of that page is marked with the `group: group-name` frontmatter field. 

When the analyzer sees such a page, it does two things. 
- It gathers all the pages that belong to the group of this page. 
- It generates a table of content page, containing links to all the pages that belongs to that group. These pages are sorted following the order they have in their directory.    

If there is a `doc_links:` frontmatter section, then the links of this section will be added. They are two kinds of links: 
- The links specified as `doc:gc-tuning` will reuse links from the `data/javadocs.json` file. But PLEASE NOTE, When using this functionality, you must add an additional "text" field to the JSON so the link can be displayed. See the `gc-tuning` entry as an example.
- You can also add `related_page:jvm.monitoring.jstat` which creates links that point to pages inside the Dev.java website. The page_id (ie `jvm.monitoring.jstat`) has to be a valid page ID. The link will open in the same tab.

Here is an example of a complete frontmatter: 

```markdown
---
id: gc.overview
title: "The Article Title"
type: tutorial
layout: learn/tutorial-group-top.html
category: jvm
category_order: 6
group: gc-overview
slug: garbage-collection
slug_history:
- old_path/garbage-collection
doc_links:
- doc:gc-tuning
- related_page:jvm.monitoring.jstat
toc: 
- Chaining Predicates with Default Methods {chaining-predicates}
- Creating Predicates with Factory Methods {creating-predicates}
- Chaining Consumers with Default Methods {chaining}
main_css_id: learn
description: "Understanding the key aspects of how garbage collection works in Java and how to tune garbage collection."
---
```

The generated page will contain the following links: 
- two links to the _Introduction to Garbage Collection_ and _Garbage Collection in Java_ pages
- a link to the [Hotspot JVM Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/17/gctuning/index.html)
- a link to the Jstat page on Dev.java.



## Embedding Videos

To embed YouTube videos, include the partial `app/templates/partials/_youtube_embed.html` - depending on where in the file tree the source file is, you may unfortunately need to go up a few directories.
Given the video slug (the part after `?v=` in the YouTube URL), it will create a responsive embed that takes up the all available horizontal space.

```
{% set embed = { slug: 'VziRKd8lLug' } %}
{% include "../../../templates/partials/_youtube_embed.html" %}
```

If you don't want to embed the video (or can't because the channel turned that option off), you can provide the thumbnail instead (get it e.g. with https://www.get-youtube-thumbnail.com/) and you'll get a linked image.

```
{% set embed = { slug: '2y5Pv4yN0b0', image: '/assets/images/stewardship_youtube_thumb.jpg' } %}
{% include "../../../templates/partials/_youtube_embed.html" %}
```
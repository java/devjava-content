# Dev.java

[Dev.java](https://dev.java) is the official website for the Java platform and language maintained by the Java Platform Group at Oracle.

We [recently announced](https://inside.java) that we are accepting contributions to Dev.java. This repository contains a lightweight JavaScript toolchain to build the site into static HTML and guidelines for contributing to it.

Here are the sections of this document:

* [Read This First](#read-this-first)
* [Contributing](#contributing)
    * [Content Lifecycle](#content-lifecycle)
    * [Content Proposal](#content-proposal)
    * [GitHub Workflow](#github-workflow)
* [Building the Site](#building-the-site)
* [Working with Content](#working-with-content)


## Read This First

Thank you for showing interest in contributing to Dev.java. Getting your content featured and seen by hundreds of thousands of developers worldwide, and the endorsement of the Java Platform Group, is very exciting but will require some effort.

This document will outline the steps to get there. Please read and understand the complete document and any supporting documents as well.

When referring to **the editors**, the document is referring directly to the Java Developer Relations team on the Java Platform Group at Oracle.

## Contributing Overview

Note: the editors reserve the right to accept, or reject, any contributions. Like contributing to Java itself, the bar is high, but the outcome is your contribution and attribution on the official Java developer site.

The process at a high level is as follows:

1. We use GitHub issues to track a contribution through its lifecycle, and pull requests to review the content itself. For more details about each stage, see the [Content Lifecycle](#content-lifecycle) section below.
1. Most contributions will come directly from `requested` content issues.
1. All content must start in the `proposed` stage and will use the Issue Template "Content Proposal". This is detailed in the [Proposal](#proposal) section below.
1. Once proposals move to `approved`, you will begin working on your contribution.
1. Reviews of your content will take place as GitHub pull requests, and once accepted, will move to the `scheduled` and `published` phases.


### Content Lifecycle

We use [GitHub issues](https://github.com/java/devjava-content/issues) to track articles from conception to publication. An article will go through the following stages, which are marked with labels:

* [requested](https://github.com/java/devjava-content/labels/requested) - Content that is needed and requested, a great place to start
* [proposed](https://github.com/java/devjava-content/labels/proposed) - Proposed for work but not approved
* [approved](https://github.com/java/devjava-content/labels/approved) - Approved for work but not started
* [in progress](https://github.com/java/devjava-content/labels/in-progress) - Under active development
* [scheduled](https://github.com/java/devjava-content/labels/scheduled) - Completed and waiting for deployment
* [published](https://github.com/java/devjava-content/issues?utf8=%E2%9C%93&q=label%3Apublished%20) - Published content


### Content Proposal

All content must start with a Content Proposal. This will be in the form of a GitHub issue using the `Content Proposal` issue template. Basic steps:

1. Look through the [requested](https://github.com/java/devjava-content/labels/requested) issues and find something that you feel uniquely capable of writing
1. Create a new issue with issue template `Content Proposal`. Please make sure the proposal thoroughly describes what you intend to contribute. An outline format detailing the sections and a sentence that describes what will be covered in each section, is preferred.
1. Fill out the fields to the best of your ability
1. Submit the issue.
1. The editors will now review your proposal and follow up with any other information needed. The status of the issue will eventually move to either `approved` or `rejected`.


### GitHub Workflow

Once your proposal has been moved to the `accepted` stage, you can begin working on your content. Here are the steps to do this:

1. Fork this repo
1. Create a branch off of `main` for each piece of content
1. Build the site. Please see the [building the site](#building-the-site) section below.
1. Create your content (see the [Working with Content](#working-with-content) section below)
1. Submit a pull request back to this repo



## Building the Site

There is some basic JavaScript infrastructure to help build the static site. There are two options:

### Option 1: Build locally

1. install node and npm. easiest way is [nvm](https://github.com/nvm-sh/nvm) and `nvm use` in this directory.
1. `npm install`
1. `npm install gulp -g`
1. `gulp`

A browser should launch viewing [https://localhost:3000](https://localhost:3000) 

### Option 2: Use Docker

1. `docker build --tag devjava .`
1. `docker run --publish 3000:3000 --init -it --rm devjava`

You should then be able to open a browser and visit [https://localhost:3000](https://localhost:3000)

(if you want to mount a volume to automatically refresh the page as you type add option `-v $PWD/app:/app/app` to your `docker run` command above)


## Working with Content

See [working with content guide](/docs/working-with-content.md)

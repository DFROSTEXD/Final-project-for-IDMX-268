# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is a video game review blog built with Eleventy v3, created as a final project for Web Development II (IDMX 268). The site features game reviews, an about page, and a contact form.

## Commands

```bash
# Install dependencies
npm install

# Start dev server with live reload (localhost:8080)
npm start

# Build for production (outputs to _site/)
npm run build
```

## Architecture

### Directory structure

- `src/` — source files (input directory)
  - `_includes/` — Nunjucks layouts (`base.njk`, `post.njk`)
  - `_data/metadata.js` — global site metadata (title, author, description)
  - `posts/` — markdown blog posts with front matter
  - `css/` — stylesheets (passthrough copied)
  - `images/` — images (passthrough copied)
- `_site/` — build output (gitignored)

### Configuration

- `.eleventy.js` uses ESM (`export default`)
- Template engine: Nunjucks for both HTML and Markdown
- Input directory: `src/`
- Output directory: `_site/`

### Collections and filters

The Eleventy config defines:
- `posts` collection: filtered by "posts" tag, sorted by date ascending
- `date` filter: formats dates (supports `%Y-%m-%d`, `%B %d, %Y`, `%Y`)
- `limit` filter: limits array output

### Post front matter

Posts use this structure:

```yaml
---
title: "Post Title"
description: "Post description"
date: 2025-12-15
tags:
  - reviews
  - rpg
  - featured
author: William H
---
```

Posts must include the `posts` tag in their directory's data or front matter to appear in the posts collection.

### Template inheritance

- `base.njk` — main layout with header, nav, footer
- `post.njk` — extends `base.njk`, adds post-specific markup (title, meta, tags, content)

## Deployment

Configured for Netlify via `netlify.toml`:
- Publish directory: `_site`
- Build command: `npm run build`
- 404 redirect configured

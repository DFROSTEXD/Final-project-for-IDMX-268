# Posts collection issue - resolution report

**Project**: William's Review Hub (Final-project-for-IDMX-268)
**Date**: December 23, 2025 at 12:30 PM ET
**Status**: Resolved

## Summary

The posts collection infrastructure was working correctly, but templates used hardcoded static HTML instead of dynamic Eleventy collections. The fix implemented Option C (hybrid approach) to preserve both the game reviews and the article posts as separate collections.

## Changes made

### 1. Added reviews collection to `.eleventy.js`

Added a new collection for game reviews alongside the existing posts collection.

```javascript
// Create reviews collection (for game reviews)
eleventyConfig.addCollection("reviews", function(collectionApi) {
  return collectionApi.getFilteredByTag("reviews").sort((a, b) => {
    return b.date - a.date; // newest first
  });
});
```

### 2. Created `src/reviews/` directory structure

**New file**: `src/reviews/reviews.json`

```json
{
  "layout": "post.njk",
  "tags": "reviews"
}
```

This directory data file automatically applies the layout and tag to all markdown files in the reviews folder.

### 3. Converted hardcoded reviews to markdown

Created 6 markdown files from the static HTML content:

| File | Game | Rating |
|------|------|--------|
| `gta5.md` | Grand Theft Auto 5 | 9.5/10 |
| `fortnite.md` | Fortnite | 8.5/10 |
| `destiny2.md` | Destiny 2 | 8.7/10 |
| `minecraft.md` | Minecraft | 9.8/10 |
| `rainbow-six-siege.md` | Rainbow Six Siege | 8.8/10 |
| `overwatch2.md` | Overwatch 2 | 7.5/10 |

### 4. Updated navigation in `src/_includes/base.njk`

Changed navigation to include both Reviews and Articles:

```njk
<nav class="nav">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about/">About</a></li>
        <li><a href="/reviews/">Reviews</a></li>
        <li><a href="/posts/">Articles</a></li>
    </ul>
</nav>
```

### 5. Created `src/reviews.njk` listing page

New template that loops over the reviews collection.

### 6. Updated `src/posts.njk` for articles

Replaced hardcoded HTML with dynamic collection loop.

### 7. Updated `src/index.njk` homepage

Now displays both "Latest Reviews" and "Latest Articles" sections using collections.

### 8. Fixed tag collision

Changed "reviews" tag to "article" in two posts that were incorrectly appearing in both collections:
- `best-rpgs-2025.md`
- `hidden-indie-gems.md`

## Tutorial: Creating Eleventy collections

### What is a collection?

A collection in Eleventy groups related content together. You can then loop over collections in templates to display lists of posts, reviews, or any content type.

### Step 1: Define the collection in `.eleventy.js`

```javascript
export default function(eleventyConfig) {
  // Create a collection named "reviews"
  eleventyConfig.addCollection("reviews", function(collectionApi) {
    // Get all items tagged with "reviews"
    return collectionApi.getFilteredByTag("reviews").sort((a, b) => {
      // Sort by date (newest first)
      return b.date - a.date;
    });
  });

  // ... rest of config
}
```

### Step 2: Create a directory for your content

```
src/
├── reviews/
│   ├── reviews.json    ← Directory data file
│   ├── gta5.md
│   ├── fortnite.md
│   └── minecraft.md
```

### Step 3: Create a directory data file

The `reviews.json` file applies default front matter to all files in the directory:

```json
{
  "layout": "post.njk",
  "tags": "reviews"
}
```

This means every `.md` file in `src/reviews/` automatically:
- Uses the `post.njk` layout
- Gets tagged with "reviews" (making it part of the collection)

### Step 4: Create markdown content files

Each markdown file needs front matter for its unique data:

```markdown
---
title: "Grand Theft Auto 5"
description: "An in-depth review of GTA5"
date: 2025-12-15
rating: "9.5/10"
author: William H
---

Your content here...
```

Note: You don't need to add `layout` or `tags` here - the directory data file handles that.

### Step 5: Loop over the collection in templates

In any Nunjucks template, access the collection:

```njk
{% for review in collections.reviews %}
<article>
    <h3><a href="{{ review.url }}">{{ review.data.title }}</a></h3>
    <p>{{ review.data.description }}</p>
    <span>{{ review.data.rating }}</span>
    <time>{{ review.date | date("%B %d, %Y") }}</time>
</article>
{% endfor %}
```

### Step 6: Limit results with filters

Show only the 3 most recent items:

```njk
{% for review in collections.reviews | limit(3) %}
    ...
{% endfor %}
```

Reverse the order:

```njk
{% for post in collections.posts | reverse %}
    ...
{% endfor %}
```

## Tutorial: Avoiding tag collisions

### The problem

If you have two collections using tags, and a content file has both tags, it appears in both collections:

```yaml
# This post appears in BOTH collections.posts AND collections.reviews
tags:
  - posts
  - reviews  # Collision!
```

### The solution

Use unique tags for each collection type:

**For game reviews** (in `src/reviews/`):
```yaml
tags:
  - reviews
  - open-world  # Additional categorization
```

**For articles** (in `src/posts/`):
```yaml
tags:
  - article     # Use "article" instead of "reviews"
  - rpg
  - featured
```

### Best practice

Choose a naming convention and stick to it:
- Collection tags: `reviews`, `posts`, `projects`
- Category tags: `rpg`, `indie`, `open-world`, `news`, `guide`

## Final site structure

```
src/
├── _data/
│   └── metadata.js
├── _includes/
│   ├── base.njk
│   └── post.njk
├── posts/
│   ├── posts.json           ← Tags all posts with "posts"
│   ├── best-rpgs-2025.md
│   ├── building-gaming-pc-2025.md
│   ├── hidden-indie-gems.md
│   ├── next-gen-console-updates.md
│   ├── pro-tips-competitive-gaming.md
│   └── rise-of-esports.md
├── reviews/
│   ├── reviews.json         ← Tags all reviews with "reviews"
│   ├── destiny2.md
│   ├── fortnite.md
│   ├── gta5.md
│   ├── minecraft.md
│   ├── overwatch2.md
│   └── rainbow-six-siege.md
├── 404.njk
├── about.njk
├── index.njk                ← Shows both collections
├── posts.njk                ← Articles listing
└── reviews.njk              ← Reviews listing
```

## Build output

The site now generates 17 pages:
- 6 individual review pages at `/reviews/[slug]/`
- 6 individual article pages at `/posts/[slug]/`
- 5 other pages (home, about, reviews listing, posts listing, 404)

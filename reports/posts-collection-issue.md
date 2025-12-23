# Posts collection issue report

**Project**: William's Review Hub (Final-project-for-IDMX-268)
**Date**: December 23, 2025 at 11:51 AM ET

## Summary

The Eleventy posts collection is configured correctly and markdown posts are building successfully, but the posts are not displayed on the site because the templates use hardcoded static HTML instead of the dynamic collection.

## Findings

### What is working

- The `.eleventy.js` configuration correctly defines a `posts` collection filtered by the "posts" tag
- The `src/posts/posts.json` file correctly applies the `posts` tag and `post.njk` layout to all markdown files in the directory
- Six markdown posts exist and build successfully to `_site/posts/*/index.html`:
  - best-rpgs-2025.md
  - building-gaming-pc-2025.md
  - hidden-indie-gems.md
  - next-gen-console-updates.md
  - pro-tips-competitive-gaming.md
  - rise-of-esports.md

### What is not working

The templates do not use the `collections.posts` data:

| File | Issue |
|------|-------|
| `src/posts.njk` | Contains hardcoded HTML for 6 different games (GTA5, Fortnite, Destiny 2, Minecraft, Rainbow Six Siege, Overwatch 2) that don't match the markdown posts |
| `src/index.njk` | Contains hardcoded HTML cards linking to anchor IDs (`#gta5-review`, etc.) that reference the hardcoded content in posts.njk |

### Content mismatch

The hardcoded reviews and the markdown posts cover completely different topics:

| Hardcoded content | Markdown posts |
|-------------------|----------------|
| Grand Theft Auto 5 | The Best RPGs of 2025 |
| Fortnite | Building a Gaming PC in 2025 |
| Destiny 2 | Hidden Indie Gems |
| Minecraft | Next-Gen Console Updates |
| Rainbow Six Siege | Pro Tips for Competitive Gaming |
| Overwatch 2 | The Rise of Esports |

## Root cause

The student created the posts collection infrastructure but never updated the templates to use it. The templates still contain placeholder or manually-written static content.

## Suggested fix

### Option A: Update templates to use dynamic collection (recommended)

Replace the hardcoded content in `src/posts.njk` with a loop over the collection:

```njk
---
layout: base.njk
title: All Reviews
description: Browse all game reviews
---

<section class="full-reviews">
    <div class="container">
        <h2 class="section-title">All Reviews</h2>

        {% for post in collections.posts | reverse %}
        <article class="full-review">
            <h3><a href="{{ post.url }}">{{ post.data.title }}</a></h3>
            <div class="review-meta">
                <span class="date">{{ post.date | date("%B %d, %Y") }}</span>
                {% for tag in post.data.tags %}
                    {% if tag != "posts" %}
                    <span class="category">{{ tag }}</span>
                    {% endif %}
                {% endfor %}
            </div>
            <p>{{ post.data.description }}</p>
            <a href="{{ post.url }}" class="read-more">Read Full Review →</a>
        </article>
        {% endfor %}
    </div>
</section>
```

Similarly update `src/index.njk` to loop over recent posts:

```njk
<div class="blog-grid">
    {% for post in collections.posts | reverse | limit(6) %}
    <article class="blog-card">
        <div class="blog-content">
            <div class="blog-meta">
                <span class="date">{{ post.date | date("%B %d, %Y") }}</span>
            </div>
            <h3>{{ post.data.title }}</h3>
            <p>{{ post.data.description }}</p>
            <a href="{{ post.url }}" class="read-more">Read More →</a>
        </div>
    </article>
    {% endfor %}
</div>
```

### Option B: Keep hardcoded content, convert to markdown

If the student prefers the GTA5/Fortnite/etc. reviews, convert the hardcoded HTML content into markdown post files and delete the current markdown posts.

### Option C: Hybrid approach - keep both reviews and posts (recommended)

Create two separate collections and navigation sections to preserve all content:

**1. Create a `reviews` collection in `.eleventy.js`:**

```javascript
// Create reviews collection (for game reviews)
eleventyConfig.addCollection("reviews", function(collectionApi) {
  return collectionApi.getFilteredByTag("reviews").sort((a, b) => {
    return b.date - a.date; // newest first
  });
});

// Keep existing posts collection (for articles/news)
eleventyConfig.addCollection("posts", function(collectionApi) {
  return collectionApi.getFilteredByTag("posts").sort((a, b) => {
    return a.date - b.date;
  });
});
```

**2. Create `src/reviews/` directory with its own data file:**

Create `src/reviews/reviews.json`:

```json
{
  "layout": "post.njk",
  "tags": "reviews"
}
```

**3. Convert hardcoded reviews to markdown files in `src/reviews/`:**

Example `src/reviews/gta5.md`:

```markdown
---
title: "Grand Theft Auto 5"
description: "An in-depth review of GTA5's immersive world and engaging storylines"
date: 2025-12-15
tags:
  - reviews
  - open-world
rating: "9.5/10"
author: William H
---

Grand Theft Auto V stands as a monumental achievement in open-world gaming...
```

**4. Update navigation in `src/_includes/base.njk`:**

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

**5. Create `src/reviews.njk` for the reviews listing:**

```njk
---
layout: base.njk
title: Game Reviews
description: In-depth reviews of popular games
---

<section class="full-reviews">
    <div class="container">
        <h2 class="section-title">Game Reviews</h2>

        {% for review in collections.reviews %}
        <article class="full-review">
            <h3><a href="{{ review.url }}">{{ review.data.title }}</a></h3>
            <div class="review-meta">
                <span class="date">{{ review.date | date("%B %d, %Y") }}</span>
                <span class="rating">{{ review.data.rating }}</span>
            </div>
            <p>{{ review.data.description }}</p>
            <a href="{{ review.url }}" class="read-more">Read Full Review →</a>
        </article>
        {% endfor %}
    </div>
</section>
```

**6. Rename `src/posts.njk` to display articles/news:**

```njk
---
layout: base.njk
title: Articles & News
description: Gaming news, guides, and articles
---

<section class="articles">
    <div class="container">
        <h2 class="section-title">Articles & News</h2>

        {% for post in collections.posts | reverse %}
        <article class="blog-card">
            <h3><a href="{{ post.url }}">{{ post.data.title }}</a></h3>
            <div class="blog-meta">
                <span class="date">{{ post.date | date("%B %d, %Y") }}</span>
            </div>
            <p>{{ post.data.description }}</p>
            <a href="{{ post.url }}" class="read-more">Read More →</a>
        </article>
        {% endfor %}
    </div>
</section>
```

**7. Update homepage to show both:**

```njk
<!-- Recent Reviews Section -->
<section class="recent-reviews">
    <div class="container">
        <h2 class="section-title">Latest Reviews</h2>
        <div class="blog-grid">
            {% for review in collections.reviews | limit(3) %}
            <article class="blog-card">
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="date">{{ review.date | date("%B %d, %Y") }}</span>
                        <span class="rating">{{ review.data.rating }}</span>
                    </div>
                    <h3>{{ review.data.title }}</h3>
                    <p>{{ review.data.description }}</p>
                    <a href="{{ review.url }}" class="read-more">Read Review →</a>
                </div>
            </article>
            {% endfor %}
        </div>
        <a href="/reviews/" class="view-all">View All Reviews →</a>
    </div>
</section>

<!-- Recent Articles Section -->
<section class="recent-articles">
    <div class="container">
        <h2 class="section-title">Latest Articles</h2>
        <div class="blog-grid">
            {% for post in collections.posts | reverse | limit(3) %}
            <article class="blog-card">
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="date">{{ post.date | date("%B %d, %Y") }}</span>
                    </div>
                    <h3>{{ post.data.title }}</h3>
                    <p>{{ post.data.description }}</p>
                    <a href="{{ post.url }}" class="read-more">Read More →</a>
                </div>
            </article>
            {% endfor %}
        </div>
        <a href="/posts/" class="view-all">View All Articles →</a>
    </div>
</section>
```

**Benefits of hybrid approach:**

- Preserves all existing content (both reviews and articles)
- Semantic separation between game reviews and general articles/news
- Both collections use the dynamic Eleventy collection system
- Easier to maintain and extend in the future
- Better site organization for visitors

## Additional observations

- The `post.njk` layout template is well-structured and will display individual posts correctly once users navigate to them
- The date filter in `.eleventy.js` supports the formats used in templates
- The `limit` filter is already defined and can be used to show recent posts on the homepage

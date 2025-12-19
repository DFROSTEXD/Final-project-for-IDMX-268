# Game Hub - Video Game Blog

A modern, responsive video game blog built with Eleventy (11ty) v3.x static site generator. This project showcases gaming content including reviews, guides, news, and esports coverage.

**Live Site:** [Your Netlify URL here]

## 🎮 About This Project

Game Hub is your ultimate destination for everything gaming! This blog is dedicated to exploring the exciting world of video games, from the latest AAA releases to hidden indie gems.

### Features

- 📝 **Blog Posts**: 6+ comprehensive articles about gaming
- 🏷️ **Categories & Tags**: Organized content with multiple tags
- 📱 **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- 🎨 **Custom Design**: Hand-crafted CSS with modern styling
- ⚡ **Fast & Static**: Built with Eleventy for optimal performance
- ♿ **Accessible**: Semantic HTML and ARIA labels

## 🛠️ Technologies Used

- **Eleventy v3.x** - Static site generator
- **Nunjucks** - Templating engine
- **Markdown** - Content authoring
- **Custom CSS** - No frameworks, fully custom styles
- **JavaScript (ES Modules)** - Configuration
- **Netlify** - Deployment platform

## 📁 Project Structure

```
Final-project-for-IDMX-268/
├── src/
│   ├── _data/
│   │   └── metadata.js          # Site metadata (title, description, author)
│   ├── _includes/
│   │   ├── base.njk             # Base layout template
│   │   └── post.njk             # Individual post layout
│   ├── posts/
│   │   ├── posts.json           # Directory data file (applies layout)
│   │   ├── best-rpgs-2025.md
│   │   ├── next-gen-console-updates.md
│   │   ├── pro-tips-competitive-gaming.md
│   │   ├── hidden-indie-gems.md
│   │   ├── building-gaming-pc-2025.md
│   │   └── rise-of-esports.md
│   ├── css/
│   │   └── style.css            # Custom responsive CSS
│   ├── index.njk                # Homepage
│   ├── about.njk                # About page
│   ├── posts.njk                # All posts archive
│   └── 404.njk                  # Custom 404 page
├── .eleventy.js                 # Eleventy configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 📝 Content

### Blog Posts (6 Collection Items)

All posts include required frontmatter:
- ✅ `title` - Post title
- ✅ `description` - Post description/summary
- ✅ `date` - Publication date
- ✅ `tags` - Multiple tags for categorization
- ✅ `author` - Post author

### Tags & Categories

Posts are organized with the following tags:
- `reviews` - Game reviews and recommendations
- `guides` - Gaming guides and tutorials
- `news` - Industry news and updates
- `esports` - Competitive gaming coverage
- `indie` - Indie game spotlights
- `hardware` - PC gaming and tech
- `featured` - Featured content

## 🎨 Design Features

### Layouts & Templates

- **base.njk** - Complete HTML structure with header, nav, footer
- **post.njk** - Individual blog post template
- **Homepage** - Displays recent/featured posts from collection
- **About Page** - Information about the blog and author
- **Posts Archive** - Complete list of all blog posts
- **404 Page** - Custom error page

### Navigation

Working navigation menu with links to:
- Home
- About
- All Posts

### Footer

Footer includes:
- Site description
- Quick links
- Social media links
- Copyright information with author name

## 🎯 Data Cascade

The project uses Eleventy's data cascade effectively:

- **metadata.js** - Global site data (title, description, author, URL)
- **posts.json** - Directory data file that applies `post.njk` layout to all posts
- **Frontmatter** - Individual post data that overrides defaults

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DFROSTEXD/Final-project-for-IDMX-268.git
cd Final-project-for-IDMX-268
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The site will be available at `http://localhost:8080` with live reload enabled.

### Build for Production

```bash
npm run build
```

The static site will be generated in the `_site` directory.

## 📦 Scripts

- `npm start` - Start development server with live reload
- `npm run build` - Build production-ready static site

## 🌐 Deployment

This site is deployed on **Netlify**.

### Netlify Configuration

The site automatically deploys when changes are pushed to the main branch.

**Build settings:**
- Build command: `npm run build`
- Publish directory: `_site`

### Deploy Your Own

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Fork this repository
2. Connect to Netlify
3. Configure build settings (see above)
4. Deploy!

## ✨ Highlights

### Meets All Requirements

✅ **Structure**
- Eleventy v3.x
- package.json with build and start scripts
- Deployed to Netlify
- Comprehensive README

✅ **Content**
- 6 collection items (blog posts)
- Complete frontmatter on each (title, description, date)
- Multiple tags/categories

✅ **Templates & Layouts**
- Base layout with complete HTML structure
- Item layout for individual posts
- Homepage showing recent/featured items
- About page

✅ **Data Cascade**
- _data/metadata.js with site info
- Directory data file (posts.json) applying layout

✅ **Navigation & Structure**
- Working navigation menu
- Custom 404 page
- Footer with site information

✅ **Styling**
- 100% custom CSS (no frameworks)
- Fully responsive (mobile, tablet, desktop)
- Modern design with gradients and animations

## 👨‍💻 Author

**William H**  
IDMX 268 Final Project  
December 2025

## 📄 License

This project is created for educational purposes as part of IDMX 268.

## 🎓 Course Information

**Course:** IDMX 268  
**Project:** Final Project - Eleventy Blog  
**Institution:** [Your Institution]  
**Semester:** Fall 2025

---

**Level up your gaming knowledge, one post at a time.** 🚀🎮


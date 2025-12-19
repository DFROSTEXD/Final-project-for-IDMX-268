export default function(eleventyConfig) {
  // Copy CSS files to output
  eleventyConfig.addPassthroughCopy("src/css");
  
  // Copy images if you add any
  eleventyConfig.addPassthroughCopy("src/images");
  
  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("src/css/");
  
  // Create posts collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByTag("posts").sort((a, b) => {
      return a.date - b.date;
    });
  });
  
  // Add date filters for Nunjucks
  eleventyConfig.addFilter("date", function(date, format) {
    const d = new Date(date);
    if (format === "%Y-%m-%d") {
      return d.toISOString().split('T')[0];
    }
    if (format === "%B %d, %Y") {
      return d.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    if (format === "%Y") {
      return d.getFullYear().toString();
    }
    return d.toLocaleDateString();
  });
  
  // Add limit filter
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}

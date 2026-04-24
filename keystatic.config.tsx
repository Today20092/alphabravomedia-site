import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*/index',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        pubDate: fields.date({
          label: 'Publish Date',
          validation: { isRequired: true }
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        youtubeId: fields.text({ label: 'YouTube ID' }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: props => props.value }
        ),
        image: fields.text({ label: 'Image Name (e.g. ./LUT Example.png)', description: 'Optional' }),
        content: fields.mdx({
          label: 'Content',
          extension: 'mdx'
        }),
      },
    }),
    portfolio: collection({
      label: 'Portfolio Items',
      slugField: 'title',
      path: 'src/content/portfolio/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        clientName: fields.text({ label: 'Client Name' }),
        videoId: fields.text({ label: 'Video ID (YouTube)', description: 'Unlisted YouTube video ID (Optional)' }),
        image: fields.text({ label: 'Image URL', description: 'Optional' }),
        category: fields.text({ label: 'Category' }),
        order: fields.integer({
          label: 'Order',
          defaultValue: 999,
          description: 'Lower numbers appear first',
        }),
        gearUsed: fields.array(
          fields.relationship({
            label: 'Gear',
            collection: 'gear',
            validation: { isRequired: true }
          }),
          {
            label: 'Gear Used',
            itemLabel: props => props.value || 'Select gear'
          }
        ),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
    gear: collection({
      label: 'Gear',
      slugField: 'title',
      path: 'src/content/gear/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        amazonLink: fields.url({ label: 'Amazon Link', validation: { isRequired: true } }),
        imageUrl: fields.text({ label: 'Image URL' }),
        category: fields.text({ label: 'Category' }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
    services: collection({
      label: 'Services & Pricing',
      slugField: 'title',
      path: 'src/content/services/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Service Name (e.g., Audio Setup)' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        order: fields.integer({
          label: 'Order',
          defaultValue: 999,
          description: 'Lower numbers appear first',
        }),
        portfolioLink: fields.text({
          label: 'Portfolio Link',
          description: 'Optional link to portfolio (e.g., /portfolio/weddings)',
        }),
        tiers: fields.blocks(
          {
            tier: {
              label: 'Pricing Tier',
              schema: fields.object({
                name: fields.text({ label: 'Tier Name (e.g., Tier 1: Essential Audio Package)' }),
                price: fields.text({ label: 'Price (e.g., $600 to $800)' }),
                bestFor: fields.text({ label: 'Best For' }),
                isPopular: fields.checkbox({
                  label: 'Highlight as Recommended/Most Popular',
                  defaultValue: false,
                }),
                includes: fields.array(
                  fields.text({ label: 'Feature/Inclusion' }),
                  {
                    label: 'What it includes',
                    itemLabel: (props) => props.value || 'New feature',
                  }
                ),
              }),
            },
          },
          { label: 'Pricing Tiers' }
        ),
      },
    }),
  },
  singletons: {
    terms: singleton({
      label: 'Terms of Service',
      path: 'src/content/legal/terms',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Terms of Service & Booking Agreement' }),
        content: fields.mdx({
          label: 'Content',
          extension: 'mdx'
        }),
      },
    }),
  },
});

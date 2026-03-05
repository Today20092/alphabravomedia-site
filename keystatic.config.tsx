import { config, fields, collection } from '@keystatic/core';

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
  },
});

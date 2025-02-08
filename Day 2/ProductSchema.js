export default {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Product Name',
      },
      {
        name: 'price',
        type: 'number',
        title: 'Price',
      },
      {
        name: 'stock',
        type: 'number',
        title: 'Stock Level',
      },
      {
        name: 'category',
        type: 'string',
        title: 'Category',
        options: {
          list: [
            { title: 'Electronics', value: 'electronics' },
            { title: 'Clothing', value: 'clothing' },
            { title: 'Groceries', value: 'groceries' },
            { title: 'Home Appliances', value: 'home-appliances' },
          ],
        },
      },
      {
        name: 'tags',
        type: 'array',
        title: 'Tags',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags',
        },
      },
      {
        name: 'image',
        type: 'image',
        title: 'Product Image',
      },
    ],
  };
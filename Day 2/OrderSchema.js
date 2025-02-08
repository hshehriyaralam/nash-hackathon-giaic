export default {
    name: 'order',
    type: 'document',
    title: 'Order',
    fields: [
      {
        name: 'orderId',
        type: 'string',
        title: 'Order ID',
      },
      {
        name: 'customer',
        type: 'reference',
        to: [{ type: 'customer' }],
        title: 'Customer',
      },
      {
        name: 'products',
        type: 'array',
        title: 'Products',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'product',
                type: 'reference',
                to: [{ type: 'product' }],
                title: 'Product',
              },
              {
                name: 'quantity',
                type: 'number',
                title: 'Quantity',
              },
            ],
          },
        ],
      },
      {
        name: 'status',
        type: 'string',
        title: 'Status',
        options: {
          list: [
            { title: 'Pending', value: 'pending' },
            { title: 'Shipped', value: 'shipped' },
            { title: 'Delivered', value: 'delivered' },
          ],
        },
      },
      {
        name: 'timestamp',
        type: 'datetime',
        title: 'Order Date and Time',
      },
    ],
  };
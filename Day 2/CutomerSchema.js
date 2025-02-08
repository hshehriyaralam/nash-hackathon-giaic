export default {
    name: 'customer',
    type: 'document',
    title: 'Customer',
    fields: [
      {
        name: 'customerId',
        type: 'string',
        title: 'Customer ID',
      },
      {
        name: 'name',
        type: 'string',
        title: 'Name',
      },
      {
        name: 'contactInfo',
        type: 'object',
        title: 'Contact Info',
        fields: [
          {
            name: 'email',
            type: 'string',
            title: 'Email',
          },
          {
            name: 'phone',
            type: 'string',
            title: 'Phone',
          },
        ],
      },
      {
        name: 'address',
        type: 'string',
        title: 'Delivery Address',
      },
      {
        name: 'orderHistory',
        type: 'array',
        title: 'Order History',
        of: [{ type: 'reference', to: [{ type: 'order' }] }],
      },
    ],
  };
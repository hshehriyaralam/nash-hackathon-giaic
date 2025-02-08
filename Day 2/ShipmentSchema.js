export default {
    name: 'shipment',
    type: 'document',
    title: 'Shipment',
    fields: [
      {
        name: 'shipmentId',
        type: 'string',
        title: 'Shipment ID',
      },
      {
        name: 'order',
        type: 'reference',
        to: [{ type: 'order' }],
        title: 'Order',
      },
      {
        name: 'status',
        type: 'string',
        title: 'Status',
        options: {
          list: [
            { title: 'In Transit', value: 'in-transit' },
            { title: 'Delivered', value: 'delivered' },
          ],
        },
      },
      {
        name: 'deliveryDate',
        type: 'datetime',
        title: 'Delivery Date',
      },
    ],
  };
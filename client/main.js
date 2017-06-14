import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

const orderFormVisible = new ReactiveVar(true);

Template.body.events({
  'click .js-order-button'(event) {
    orderFormVisible.set(true);
  },
});

Template.registerHelper('cats', () => Categories.find({}, { sort: { name: 1 } }));
Template.registerHelper('isOrderFormVisible', () => orderFormVisible.get());

// orders
Template.orders.onCreated(() => {
  //  moment.locale('en');
});

Template.orders.helpers({
  orders() {
    console.log('get tasks:');
    return Orders.find({}, { sort: { createdAt: -1 } });
  },
  formatDate(date) {
    return moment(date).fromNow();
  },
});

// order_form
Template.order_form.events({
  'submit .js-order-form'(event, templateInstance) {
    const descr = event.target.description.value;
    const category = event.target.category.value;
    const catId = $(event.target.category).data('val');
    if (descr && category && catId) {
      Orders.insert({
        description: descr,
        category: {
          id: catId,
          name: category,
        },
      });
      templateInstance.find('form').reset();
      orderFormVisible.set(false);
    }
    return false;
  },
});

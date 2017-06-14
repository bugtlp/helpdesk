import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.mdlSelectField.onCreated(function () {
  // Генерируем уникальный id
  this.tid = Math.random().toString(36).substring(7);
});

Template.mdlSelectField.onRendered(function () {
  this.dropdown = this.$('.mdl-select-field')[0];
  this.menu = this.dropdown.querySelector('.mdl-js-menu');
  this.input = $(this.dropdown.querySelector('input'));
  MDl.componentHandler.upgradeDom();
});

Template.mdlSelectField.helpers({
  tid: function () {
    return Template.instance().tid;
  },
});

Template.mdlSelectField.events({
  'click .mdl-menu__item'(event, templateInstance) {
    const displayValue = event.target.textContent;
    const hiddenValue = event.target.dataset.val;
    templateInstance.input.val(displayValue);
    templateInstance.dropdown.MaterialTextfield.change(displayValue);
    Meteor.setTimeout(function () {
      templateInstance.dropdown.MaterialTextfield.updateClasses_(); // update css class
    }, 250);

    // Устанавливаем скрытое значение (например идентификатор)
    templateInstance.input.data('val', hiddenValue || '');
    templateInstance.input.trigger('change');
    templateInstance.menu.MaterialMenu.hide();
  },

  'keydown input'(event, templateInstance) {
    if (event.keyCode === 38 || event.keyCode === 40) {
        templateInstance.menu['MaterialMenu'].show();
    }
  },

  // По нажатию  Enter возвращаем фокус на поле
  'keydown .mdl-js-menu'(event, templateInstance) {
    if (event.keyCode === 13) {
      templateInstance.input.focus();
    }
  },
});


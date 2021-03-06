import Vue from 'vue'
import App from './App.vue'
import VueTippy from 'vue-tippy'

import store from './services/store'

Vue.use(VueTippy, {
	maxWidth: '200px',
	duration: 200,
	arrow: false,
	animation: 'scale',
	size: 'small',
	delay: 0,
	animateFill: false,
	theme: 'blue'
});

Vue.component('editable', {
	template: `<div contenteditable="true" @keydown.enter.prevent @input="changed=true" @focus="changed=false" @blur="handle"></div>`,
	props: ['content'],
  data() {
    return {
      changed: false,
    };
  },
	mounted: function () {
		this.$el.innerText = this.content;
	},
	watch: {
		content: function () {
			if (this.$el.innerText !== this.content) {
				this.$el.innerText = this.content;
			}
		}
	},
	methods: {
		handle($event) {
			if ($event.which === 13) {
				event.preventDefault();
				return;
			}

			this.changed && this.$emit('output', $event.target.innerText);
		}
	}
});

new Vue({
	el: '#app',
	store,
	render: h => h(App),
	props: ['initialized'],
})

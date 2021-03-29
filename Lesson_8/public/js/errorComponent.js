Vue.component('show-error', {
    data(){
        return {
            text: ''
        }
    },
    methods: {
      setError(error){
          this.text = error
      }
    },
    computed: {
      isVisible(){
          return this.text !== ''
      }
    },
    template: `<div class="error" v-if="isVisible">
                    <h2 class="error">
                        <button @click="setError('')">&times;</button>
                        {{ text }}
                    </h2>
               </div>`
});
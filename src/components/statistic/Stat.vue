<template>
    	<div style="text-align:left"> 
        xxx 
       <transition name="fade" mode="out-in" class="routerswitch">
						<router-view></router-view>
				</transition>
      </div>

</template>

<script>

export default {
  data() {
			return {
      }
  },
  filters: {
		
	},
  methods:{
    
  },
  mounted() {
			
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

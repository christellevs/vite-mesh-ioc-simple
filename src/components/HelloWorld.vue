<template>
	<h1>{{ message }}</h1>
	<div class="card">
	<button class="Btn" type="button" @click="increment()">count is {{ count }}</button>
	</div>
</template>

<script>
export default {
	
	inject: [ 'helloWorld' ],
		
	computed: {
		
		message() {
			return this.helloWorld.message;
		},
	
		count() {
			return this.helloWorld.count;
		}
		
	},
	
	methods: {
	
		increment() {
			return this.helloWorld.incrementCount()
		}
	}

}
</script>

<style scoped>
.Btn {
	background-color: blue;
	color: white
}
</style>

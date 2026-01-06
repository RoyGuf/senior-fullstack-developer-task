<template>
	<div>
		<h1>Editors Page</h1>
		<h2>Welcome, {{ username }}!</h2>
	</div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const username = computed(() => store.getters.username);

</script>
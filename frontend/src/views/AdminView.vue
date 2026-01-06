<template>
	<div>
		<h1>Admins Page</h1>
		<h2>Welcome, {{ username }}!</h2>
	</div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const username = computed(() => store.getters.username);

</script>

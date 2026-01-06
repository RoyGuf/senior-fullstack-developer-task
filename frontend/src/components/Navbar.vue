<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="text-h6 font-weight-bold">
        HyperGuest
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text to="/">Login</v-btn>
        <v-btn text to="/home">Home</v-btn>
        <v-btn text to="/admin">Admin</v-btn>
        <v-btn text to="/editor">Editor</v-btn>
      </v-toolbar-items>

      <v-menu
        center
        right
        transition="slide-y-transition"
        class="hidden-md-and-up"
      >
        <template v-slot:activator="{ props }" >
          <v-btn icon v-bind="props" class="hidden-md-and-up">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item :to="'/'" router>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
          <v-list-item :to="'/home'" router>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item :to="'/admin'" router>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item>
          <v-list-item :to="'/editor'" router>
            <v-list-item-title>Editor</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  name: "ModernNavbar",
};
</script>

<style scoped>
.v-toolbar-title {
  cursor: pointer;
}

.v-btn {
  color: #ffffffbd;
	
}

.v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transition: 0.3s;
}

.v-btn--icon {
	margin: 0 auto;
	background-color: rgba(255, 255, 255, 0.1);
}

.v-application {
  background-color: transparent !important;
}

.v-application__wrap {
  background-color: transparent !important;
	min-height: 0px !important;
	height: 0px !important;
}

@media (min-width: 960px) {
  .hidden-md-and-up {
    display: none !important;
  }
}
</style>

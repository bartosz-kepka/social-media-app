<template>
  <v-container class="container">
    <v-row class="mb-0">
      <v-col
          cols="12"
          sm="8"
      >
        <div class="text-h4">
          <header class="jumbotron">
            <h3>
              <strong>{{ displayName }}</strong> Profile
            </h3>
          </header>
        </div>
      </v-col>
    </v-row>
    <div class="d-flex align-center">
      <v-divider class="mr-3"/>
    </div>

    <v-text-field
      v-model.trim="edited.lastName"
      :label="$t('general.last-name')"
      outlined
    />
    <v-text-field
      v-model.trim="edited.firstName"
      :label="$t('general.first-name')"
      outlined
    />
    <v-text-field
      v-model.trim="edited.description"
      :label="$t('general.description')"
      outlined
    />
    <p>
      {{ currentUser.firstName }}
    </p>
    <p>
      {{ currentUser.description }}
    </p>
    <p>
      {{ currentUser.lastName }}
    </p>
    <p>
      {{ currentUser.password }}
    </p>
    <p>
      {{ currentUser.email }}
    </p>
    <v-btn
      @click="editUser"
    >
      Edit
    </v-btn>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'Profile',

  data() {
    return {
      edited: {
        firstName: '',
        lastName: '',
        email: '',
        id: '',
        description: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/user',
      displayName: 'user/displayName',
    }),
  },
  mounted() {
    this.edited.firstName = this.currentUser.firstName;
    this.edited.lastName = this.currentUser.lastName;
    this.edited.email = this.currentUser.email;
    this.edited.id = this.currentUser.id;
    this.edited.description = this.currentUser.description;
  },
  methods: {
    editUser() {
      this.setCurrentUser();
      // this.currentUser.firstName = 'Jan';
      //console.log(this.edited);
      //const edited = this.currentUser;
      this.$store.dispatch('user/update', this.edited)
    },

    setCurrentUser() {
      this.currentUser.firstName = this.edited.firstName;
      this.currentUser.lastName = this.edited.lastName;
      this.currentUser.description = this.edited.description;
    }
  },
};
</script>

<style scoped lang="scss">
</style>

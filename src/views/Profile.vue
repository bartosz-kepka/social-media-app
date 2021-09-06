<template>
  <v-container class="container">
    {{ JSON.stringify(this.user) }}
    <Spinner v-if="loading"/>
    <div v-else>
      <div v-if="!editMode">
        <div class="text-h6">
          {{ $t('general.first-name') }}
        </div>
        <div class="mb-4">
          {{ user.firstName }}
        </div>
        <div class="text-h6">
          {{ $t('general.first-name') }}
        </div>
        <div class="mb-4">
          {{ user.firstName }}
        </div>
        <div class="text-h6">
          {{ $t('general.first-name') }}
        </div>
        <div class="mb-4">
          {{ user.firstName }}
        </div>
      </div>
      <div v-else>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                v-model.trim="editedUser.firstName"
                :label="$t('general.first-name')"
                outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                v-model.trim="editedUser.lastName"
                :label="$t('general.first-name')"
                outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-textarea
                v-model.trim="editedUser.description"
                :label="$t('general.first-name')"
                outlined
            />
          </v-col>
        </v-row>
      </div>
      <v-btn
          v-if="editPossible && !editMode"
          @click="editMode = !editMode"
      >
        EDIT
      </v-btn>
      <v-btn
          v-if="editPossible && editMode"
          @click="editMode = !editMode"
      >
        CANCEL
      </v-btn>
      <v-btn
          v-if="editPossible && editMode"
          @click="editUser"
      >
        SAVE
      </v-btn>
      <!--    <v-row class="mb-0">-->
      <!--      <v-col-->
      <!--          cols="12"-->
      <!--          sm="8"-->
      <!--      >-->
      <!--        <div class="text-h4">-->
      <!--          <header class="jumbotron">-->
      <!--            <h3>-->
      <!--              <strong>{{ displayName }}</strong> Profile-->
      <!--            </h3>-->
      <!--          </header>-->
      <!--        </div>-->
      <!--      </v-col>-->
      <!--    </v-row>-->
      <!--    <div class="d-flex align-center">-->
      <!--      <v-divider class="mr-3"/>-->
      <!--    </div>-->

      <!--    <v-text-field-->
      <!--        v-model.trim="edited.lastName"-->
      <!--        :label="$t('general.last-name')"-->
      <!--        outlined-->
      <!--    />-->
      <!--    <v-text-field-->
      <!--        v-model.trim="edited.firstName"-->
      <!--        :label="$t('general.first-name')"-->
      <!--        outlined-->
      <!--    />-->
      <!--    <v-text-field-->
      <!--        v-model.trim="edited.description"-->
      <!--        :label="$t('general.description')"-->
      <!--        outlined-->
      <!--    />-->
      <!--    <v-btn-->
      <!--        @click="editUser"-->
      <!--    >-->
      <!--      Edit-->
      <!--    </v-btn>-->

    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import UserService from '@/services/http/user.service';
import i18n from '@/locales/i18n';
import { NOTIFICATION_TYPES } from '@/store/modules/notification';
import Spinner from '@/components/shared/Spinner';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Profile',
  components: { Spinner },
  data() {
    return {
      user: undefined,
      editedUser: {
        firstName: '',
        lastName: '',
        description: '',
        password: '',
      },
      editMode: false,
      loading: true,
    };
  },
  computed: {
    ...mapGetters({
      displayName: 'user/displayName',
      currentUserId: 'user/userId',
    }),
    editPossible() {
      return this.currentUserId === this.userId;
    },
    userId() {
      return this.$route.params.userId;
    },
  },
  watch: {
    userId() {
      this.getUser();
    },
  },
  beforeMount() {
    this.getUser();
  },
  // updated() {
  //   console.log('UPDATS');
  //   if (this.userId !== this.$route.params.userId) {
  //     this.userId = this.$route.params.userId;
  //   }
  // },
  methods: {
    getUser() {
      this.loading = true;
      UserService.getUser(this.userId).then(
          ({ data: user }) => {
            this.user = user;
            this.editedUser = {
              ...this.editedUser,
              ...user,
            };
          },
      ).finally(() => this.loading = false);
    },
    editUser() {
      UserService.editUser(this.userId, this.editedUser)
          .then(() => {
            const message = i18n.t('notifications.editUser-success');
            this.$store.dispatch('notification/showNotification', {
              message,
              type: NOTIFICATION_TYPES.SUCCESS,
            });
          });
    },
  },
  validations: {
    editedUser: {
      firstName: {
        required,
      },
      password: {
        required,
      },
    },
  },
};
</script>

<style scoped lang="scss">
</style>

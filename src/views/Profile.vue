<template>
  <v-container class="container">
    <!--    {{ JSON.stringify(this.user) }}-->
    <Spinner
        v-if="loading"
    />
    <div
        v-else
        class="pa-8"
    >
      <div
          v-if="!editMode"
      >
        <div class="text-h6">
          {{ $t('general.first-name') }}:
        </div>
        <div class="mb-4 text-h5 font-weight-bold ml-16 pl-11 outlin">
          {{ user.firstName }}
        </div>
        <div class="text-h6">
          {{ $t('general.last-name') }}:
        </div>
        <div class="mb-4 text-h5 font-weight-bold ml-16 pl-11">
          {{ user.lastName }}
        </div>
        <div class="text-h6">
          {{ $t('general.description') }}:
        </div>
        <div class="mb-4 text-h5 font-weight-bold ml-16 pl-11">
          {{ user.description }}
        </div>
      </div>
      <div v-else>
        <div class="text-h6 ">
          {{ $t('general.first-name') }}:
        </div>
        <div class="mb-2 text-h5 font-weight-bold ml-16 pl-11">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                  v-model.trim="editedUser.firstName"
                  outlined
              />
            </v-col>
          </v-row>
        </div>
        <div class="text-h6">
          {{ $t('general.last-name') }}:
        </div>
        <div class="mb-2 text-h5 font-weight-bold ml-16 pl-11">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                  v-model.trim="editedUser.lastName"
                  outlined
              />
            </v-col>
          </v-row>
        </div>
        <div class="text-h6">
          {{ $t('general.description') }}:
        </div>
        <div class="mb-2 text-h5 font-weight-bold ml-16 pl-11">
          <v-row>
            <v-col
                cols="12"
                md="6"
            >
              <v-textarea
                  v-model.trim="editedUser.description"
                  outlined
              />
            </v-col>
          </v-row>
        </div>
      </div>
      <v-btn
          v-if="editPossible && !editMode"
          class="v-btn v-btn--text theme--dark v-size--default"
          @click="editMode = !editMode"
      >
        EDIT
      </v-btn>
      <div class="ml-16 pl-11 mr-16 d-flex justify-space-between">
      <v-row>
        <v-col class="d-flex justify-space-between">
          <div class="d-flex">
            <v-btn
                v-if="editPossible && editMode"
                class="v-btn mr-16"
                @click="cancelBtn()"
            >
              CANCEL
            </v-btn>
            <v-btn
                v-if="editPossible && editMode"
                class="v-btn primary ml-16"
                @click="editUser"
            >
              SAVE
            </v-btn>
          </div>
        </v-col>
      </v-row>
      </div>
    </div>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';
import UserService from '@/services/http/user.service';
import i18n from '@/locales/i18n';
import {NOTIFICATION_TYPES} from '@/store/modules/notification';
import Spinner from '@/components/shared/Spinner';
import {maxLength, minLength, required} from 'vuelidate/lib/validators';

export default {
  name: 'Profile',
  components: {Spinner},
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
      currentUser: 'user/user'
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
  methods: {
    getUser() {
      this.loading = true;
      UserService.getUser(this.userId).then(
          ({data: user}) => {
            this.user = user;
            this.editedUser = {
              ...this.editedUser,
              ...user,
            };
          },
      ).finally(() => this.loading = false);
    },
    editUser() {
      this.user = {
        ...this.user,
        ...this.editedUser,
      };
      this.currentUser.firstName = this.editedUser.firstName;
      this.currentUser.lastName = this.editedUser.lastName;
      UserService.editUser(this.userId, this.editedUser)
          .then(() => {
            const message = i18n.t('notifications.update-success');
            this.$store.dispatch('notification/showNotification', {
              message,
              type: NOTIFICATION_TYPES.SUCCESS,
            });
          });
      this.editMode = !this.editMode;
    },
    cancelBtn() {
      this.editMode = !this.editMode;
      this.editedUser = {
        ...this.editedUser,
        ...this.user,
      };
    }
  },
  validations: {
    editedUser: {
      firstName: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(50),
      },
      lastName: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(50),
      },
      description: {
        maxLength: maxLength(1200),
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>

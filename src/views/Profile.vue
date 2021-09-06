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
<!--        <v-row>-->
<!--          <v-col cols="12" md="6">-->
<!--            <v-text-field-->
<!--                v-model.trim="editedUser.firstName"-->
<!--                :label="$t('general.first-name')"-->
<!--                outlined-->
<!--                readonly-->
<!--            />-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--        <v-row>-->
<!--          <v-col cols="12" md="6">-->
<!--            <v-text-field-->
<!--                v-model.trim="editedUser.lastName"-->
<!--                :label="$t('general.first-name')"-->
<!--                outlined-->
<!--                readonly-->
<!--            />-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--        <v-row>-->
<!--          <v-col cols="12" md="6">-->
<!--            <v-textarea-->
<!--                v-model.trim="editedUser.description"-->
<!--                :label="$t('general.first-name')"-->
<!--                outlined-->
<!--                readonly-->
<!--            />-->
<!--          </v-col>-->
<!--        </v-row>-->
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
      <div class="justify-space-between py-3">
        <v-btn
          v-if="editPossible && editMode"
          class="v-btn"
          @click="cancelBtn()"
        >
           CANCEL
        </v-btn>
        <v-btn
          v-if="editPossible && editMode"
          class="v-btn primary pull-right"
          @click="editUser"
        >
          SAVE
        </v-btn>
      </div>
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

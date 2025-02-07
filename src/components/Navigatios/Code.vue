<template>
  <v-app id="Code" class="accent">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm7 md4 lg4>
            <div class="layout column align-center">
              <img
                src="@/assets/engine.png"
                alt="Vue Material Admin"
                width="220"
                height="90"
              />
            </div>
            <v-card class="elevation-5 pa-3">
              <v-card-text class="text_aling-center">
                <strong class="text_aling-center">
                  Ingrese su código enviado por SMS
                </strong>
                <div style="display: flex; flex-direction: row">
                  <v-col cols="2" sm="3" md="2">
                    <v-text-field
                      outlined
                      dense
                      v-model="first"
                      id="firstElement"
                      @input="handleOnChange('first')"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="2" sm="3" md="2">
                    <v-text-field
                      outlined
                      dense
                      v-model="second"
                      id="secondElement"
                      @input="handleOnChange('second')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2" sm="3" md="2">
                    <v-text-field
                      outlined
                      dense
                      v-model="third"
                      id="thirdElement"
                      @input="handleOnChange('third')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2" sm="3" md="2">
                    <v-text-field
                      outlined
                      dense
                      v-model="fourth"
                      id="fourthElement"
                      @input="handleOnChange('fourth')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2" sm="3" md="2">
                    <v-text-field
                      outlined
                      dense
                      v-model="fifth"
                      id="fifthElement"
                      @input="handleOnChange('fifth')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2" sm="3" md="2">
                    <v-text-field
                      outlined
                      dense
                      v-model="sixth"
                      id="sixthElement"
                      @input="handleOnChange('sixth')"
                    ></v-text-field>
                  </v-col>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :dark="invalid"
                  @click="submit()"
                  :disabled="!invalid"
                  block
                  color="accent"
                  :loading="loading"
                  id="finalizarelement"
                  v-on="on"
                  >Activar
                </v-btn>
              </v-card-actions>
              <div class="layout row align-center justify-center footerImage">
                <h5 class="pr-2">powered by</h5>
                <img
                  src="@/assets/chariot.png"
                  alt="Vue Material Admin"
                  width="110"
                  height="30"
                />
              </div>
            </v-card>
            <v-row justify="center">
              <v-dialog
                v-model="dialogsms"
                max-width="350"
                ref="modal"
                persistent
              >
                <v-card loading>
                  <v-card-title class="text-h4">
                    Loteria Nacional
                  </v-card-title>
                  <v-card-text>
                    <p>Usuario registrado con éxito!.</p>
                    <p>En un lapso de 24 horas nos pondremos en contacto</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="Dialogo">
                      Agree
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar
        :multi-line="true"
        :timeout="2500"
        :value="error"
        transition="true"
        absolute
        bottom
        elevation="24"
        color="error"
      >
        {{ errorMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn icon color="white" v-bind="attrs" @click="restoreErrors">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
    <footer class="layout align-end justify-center">
      <p class="text-center footerText">
        Copyright © 2017-2021 CHARIOT Todos los derechos reservados |
        Desarrollado por DI
      </p>
    </footer>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { http } from "@/plugins/axios";

export default {
  name: "Code",
  components: {},
  data() {
    return {
      otp: "",
      length: 7,
      first: "",
      second: "",
      third: "",
      fourth: "",
      fifth: "",
      sixth: "",
      invalid: false,
      dialogsms: false,
      dialog: false,
    };
  },
  computed: {
    ...mapState(["error", "errorMessage"]),
    ...mapState(["loading"]),
  },
  watch: {
    error(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.restoreErrors();
        }, 2000);
      }
    },
  },
  methods: {
    ...mapActions("auth", ["Code"]),
    ...mapMutations(["restoreErrors"]),

    async submit() {
      var valid =
        this.first +
        this.second +
        this.third +
        this.fourth +
        this.fifth +
        this.sixth;
      if (valid.length == 6) {
        const responsesavecode = await http.post(
          `/Location/UpdateRegistro?hash=${valid}`
        );
        try {
          if (responsesavecode.status === "Ok") {
            this.dialogsms = true;
            //this.$router.push({ name: "Code"})
          } else {
            alert(responsesavecode.messege);
          }
        } catch (dataError) {
          alert(responsesavecode.error);
        } finally {
          this.loadingProvinces = false;
        }
      }
    },

    Dialogo() {
      //this.$router.reload({ name: "Register" })
      this.$router.push({ name: "Register" });
      window.location.reload({ name: "Register" });
    },
    handleOnChange(element) {
      if (element === "first") {
        if (this.first.length > 1) {
          this.$nextTick(() => {
            this.first = this.first.substring(0, 1);
            document.getElementById("secondElement").focus();
          });
        }
      }
      if (element === "second") {
        if (this.second.length > 1) {
          this.$nextTick(() => {
            this.second = this.second.substring(0, 1);
            document.getElementById("thirdElement").focus();
          });
        }
      }
      if (element === "third") {
        if (this.third.length > 1) {
          this.$nextTick(() => {
            this.third = this.third.substring(0, 1);
            document.getElementById("fourthElement").focus();
          });
        }
      }
      if (element === "fourth") {
        if (this.fourth.length > 1) {
          this.$nextTick(() => {
            this.fourth = this.fourth.substring(0, 1);
            document.getElementById("fifthElement").focus();
          });
        }
      }
      if (element === "fifth") {
        if (this.fifth.length > 1) {
          this.$nextTick(() => {
            this.fifth = this.fifth.substring(0, 1);
            document.getElementById("sixthElement").focus();
          });
        }
      }
      if (element === "sixth") {
        this.invalid = false;
        if (this.sixth.length > 1) {
          this.$nextTick(() => {
            this.sixth = this.sixth.substring(0, 1);
            document.getElementById("finalizarelement").focus();
          });
        }
        var valids =
          this.first +
          this.second +
          this.third +
          this.fourth +
          this.fifth +
          this.sixth;
        if (valids.length >= 6) {
          this.invalid = true;
        }
      }
    },
    handleClearInput() {
      this.$refs.otpInput.clearInput();
    },
  },
};
</script>

<style scoped lang="css">
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
#Code {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
.footerImage {
  margin: 20px;
}
.footerText {
  font-size: 11px;
  font-weight: bold;
}
</style>

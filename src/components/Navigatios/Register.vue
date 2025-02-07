<template>
  <v-app id="Register" class="accent">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm7 md4 lg4>
            <ValidationObserver
              ref="obs"
              v-slot="{ invalid, validated, handleSubmit }"
            >
              <v-card class="elevation-5 pa-3">
                <v-card-text>
                  <div class="layout column align-center">
                    <img
                      src="@/assets/engine.png"
                      alt="Vue Material Admin"
                      width="220"
                      height="90"
                    />
                  </div>

                  <div class="layout column align-center">
                    Loteria Nacional
                  </div>

                  <div class="layout column align-left">
                    Registro de Usuario
                  </div>

                  <v-form>
                    <ValidationProvider
                      name="documento de identidad"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        class="v-text-field"
                        v-model="documento"
                        :counter="10"
                        :rules="nameRules"
                        label="CI"
                        name="CI"
                        append-icon="mdi-user"
                        type="text"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </ValidationProvider>

                    <ValidationProvider
                      name="nombres"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        class="v-text-field"
                        v-model="nombres"
                        label="Nombres"
                        name="name"
                        append-icon="mdi-user"
                        type="text"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>

                    <ValidationProvider
                      name="apellidos"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        class="v-text-field"
                        v-model="apellidos"
                        label="Apellidos"
                        name="apellidos"
                        append-icon="mdi-user"
                        type="text"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>

                    <ValidationProvider
                      name="Provincia"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-select
                        v-model="Provincia"
                        :items="Provincias"
                        label="Provincia"
                        item-text="label"
                        item-value="value"
                        required
                        outlined
                        color="accent darken-1"
                        :menu-props="{ top: false, offsetY: true }"
                        :error-messages="errors"
                        @change="getCmbCiudades($event)"
                      >
                        <template v-slot:selection="data">
                          {{ data.item.label }}
                        </template>
                      </v-select>
                    </ValidationProvider>

                    <ValidationProvider
                      name="Ciudad"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-select
                        v-model="Ciudad"
                        :items="Ciudades"
                        label="Ciudad"
                        item-text="label"
                        item-value="value"
                        required
                        outlined
                        color="accent darken-1"
                        :menu-props="{ top: false, offsetY: true }"
                        :error-messages="errors"
                        key="value"                        
                        @change="getCmbParishes($event)"
                      >
                        <template v-slot:selection="data">
                          {{ data.item.label}}
                        </template>
                      </v-select>
                    </ValidationProvider>

                    <ValidationProvider
                      name="Sector"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-select
                        v-model="Sector"
                        :items="Sectores"
                        label="Sector"
                        item-text="label"
                        item-value="value"
                        required
                        outlined
                        color="accent darken-1"
                        :menu-props="{ top: false, offsetY: true }"
                        :error-messages="errors"
                      >
                        <template v-slot:selection="data">
                          {{ data.item.label }}
                        </template>
                      </v-select>
                    </ValidationProvider>

                    <ValidationProvider
                      name="direccion"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        class="v-text-field"
                        v-model="direccion"
                        label="Dirección"
                        name="direccion"
                        append-icon="mdi-user"
                        type="text"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>

                    <ValidationProvider
                      name="Celular"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        class="v-text-field"
                        v-model="Celular"
                        label="Celular"
                        name="Celular"
                        append-icon="mdi-user"
                        type="number"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>

                    <ValidationProvider
                      name="Telefono"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        class="v-text-field"
                        v-model="Telefono"
                        label="Teléfono"
                        name="Telefono"
                        append-icon="mdi-user"
                        type="number"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>

                    <ValidationProvider
                      name="check"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <p>
                        <input
                          type="checkbox"
                          id="checkbox"
                          v-model="checked"
                          :error-messages="errors"
                        />
                        Estoy de acuerdo con los
                        <a href="https://www.mozilla.org/es-ES/">
                          terminos y Condiciones
                        </a>
                        del Servicio.
                      </p>
                      <label for="checkbox" style="display:none;">
                        {{ checked }}
                      </label>
                    </ValidationProvider>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    :dark="!invalid && validated"
                    @click="handleSubmit(submit)"
                    :disabled="invalid || !validated"
                    block
                    color="accent"
                    :loading="loading"
                  >
                    Finalizar
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
            </ValidationObserver>
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
            <v-icon>
              mdi-close
            </v-icon>
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
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapActions, mapMutations, mapState } from "vuex";
import { http } from "@/plugins/axios";


export default {
  name: "Register",
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  created() {
    this.ObtenerDatos();
  },

  data() {
    return {
      documento: "",
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      nombres: "",
      apellidos: "",
      direccion: "",
      Telefono: "",
      Celular: "",
      checked: false,
      Provincia: "",
      Provincias: [],
      Ciudad: "",
      Ciudades: [],
      Sector: "",
      Sectores: [],      
      Totalciudades: [],
      Totalparroquias: [],
      RegisterItem: {
        Code: "",
        Name: "",
        SurName: "",
        TypeDocument: "",
        Document: "",
        StatusRegister: "A",
        Phone: "",
        Mobile: "",
        IdAccount: 22,
        Id: "",
        IdTypePerson: "",
        mail: "",
      },
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
    ...mapActions("auth", ["register"]),
    ...mapMutations(["restoreErrors"]),

    async submit() {
      var person 
       await this.register(
        person = {
        Document: this.documento,
        Name: this.nombres,
        SurName: this.apellidos,
        IdProvince: this.Provincia,
        IdDistrict: this.Ciudad,
        IdParish: this.Sector,
        Direccion: this.direccion,
        Phone: this.Telefono,
        Movil: this.Celular,
        Checked: this.checked,
      });
      try {
      const transactionDataPerson = {
          transaction: "I",
          person: person,
        };
      const responsesave = await http.post(`/Location/insertPerson`, transactionDataPerson);
      try {
        if (responsesave.status === "Ok") {
          
          this.loadingProvinces = false;
          this.$router.push({ name: "Code"})
          
        } else {
          throw responsesave.messege;
        }
      } catch (dataError) {
        alert(responsesave.error);
      } finally {
        this.loadingProvinces = false;
      }   

      //console.log("JSONPERSON")
      console.log(JSON.stringify(transactionDataPerson))
      //this.$router.replace("/Login");
      } 
      catch (e) {
        alert(e);
      } 
      finally {
        this.close("P");
        this.setLoading(false);
      }
  
    },

    

    

    async ObtenerDatos() {
      this.loadingProvinces = true;
      this.loadingParishes = true;
      const response = await http.get(`/Location/getLocation?Name&Id`);
      const responsepa = await http.get(`/Location/getParishes?Name&Id`);

      try {
        if (response.status === "Ok") {
          var data = response.data;
          this.Totalciudades = data;
          this.getCmbProvinces();
        } else {
          throw response.messege;
        }
      } catch (dataError) {
        alert(dataError);
      } finally {
        this.loadingProvinces = false;
      }

      try {
        if (responsepa.status === "Ok") 
        {
          var datapa = responsepa.data;
          this.Totalparroquias = datapa;
          this.getCmbParishes();
        } else {
          throw responsepa.messege;
        }
      } catch (dataError) {
        alert(dataError);
      } finally {
        this.loadingParishes = false;
      }
    },

    async getCmbProvinces() {
      this.Totalciudades.forEach((element) => {
        element.forEach((prov) => {
          var item = {
            value: prov.id,
            label: prov.name,
          };
          this.Provincias.push(item);
        });
      });
    },

    async getCmbCiudades(idProv) {
      //console.log(idProv);
      this.Ciudad = []
      this.Sector = []
      this.Totalciudades.forEach((element) => {
        element.forEach((prov) => {

          if (prov.id == idProv) 
          {
            let ciudades = prov.districts
            ciudades.forEach((ciud) => {
              var item = {
                value: ciud.id,
                label: ciud.name,
              };
              this.Ciudades.push(item);
            });
          }
        });
      });
    },

    async getCmbParishes(id) {
      //console.log(id);
      this.Sector = []
      this.Totalparroquias.forEach((element) => {
        element.forEach((dist) => {

          if (dist.id == id) 
          {
            let parroq = dist.parishes
            parroq.forEach((ciud) => {
              var item = {
                value: ciud.id,
                label: ciud.name,
              };
              this.Sectores.push(item);
            });
          }
        });
      });
    },    
  },
};
</script>

<style scoped lang="css">
#Register {
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

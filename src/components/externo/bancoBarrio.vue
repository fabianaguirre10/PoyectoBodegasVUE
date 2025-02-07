

<template>
  <v-app>
    <v-main>
      <div></div>

      <v-dialog v-model="dialog" persistent max-width="490">
        <v-card>
          <v-card-title class="text-h5 justify-center">
            ¡Proceso exitoso!
          </v-card-title>
          <v-card-text>Pronto un asesor se contactará contigo </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="green darken-1" text @click="salir"> Aceptar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md5 lg5>
            <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
              <v-card class="elevation-5 pa-3">
                <v-card-text>
                  <div class="">
                    <a href="https://www.bancoguayaquil.com/">
                      <img
                        style="width: 12rem"
                        alt="Logo Banco Guayaquil blanco"
                        src="/img/logo_magenta.png"
                        title="Logo Banco Guayaquil blanco"
                      />
                    </a>
                  </div>
                  <center>
                    <h2 type="INFORMACION" color="white" class="HeadText">
                      Conviértete en Banquero del Barrio 9
                    </h2>
                  </center>

                  <b>Ingresa tus datos y nos comunicaremos contigo</b>
                  <br />
                  <br />
                  <v-form>
                    <ValidationProvider
                      name="provincia"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label><b>Provincia</b></label>
                      <v-select
                        v-model="RegisterDisensa.provincia"
                        :items="Provincias"
                        placeholder="Seleccione una opción"
                        item-text="label"
                        item-value="Provincia"
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
                      name="ciudad"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label><b>Ciudad</b></label>
                      <v-select
                        v-model="RegisterDisensa.ciudad"
                        :items="Ciudades"
                        placeholder="Seleccione una opción"
                        item-text="label"
                        item-value="Ciudad"
                        required
                        outlined
                        color="accent darken-1"
                        :menu-props="{ top: false, offsetY: true }"
                        :error-messages="errors"
                        key="value"
                        @change="getCmbParishes($event)"
                      >
                        <template v-slot:selection="data">
                          {{ data.item.label }}
                        </template>
                      </v-select>
                    </ValidationProvider>

                    <ValidationProvider
                      name="nombres"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label><b>Nombres</b></label>
                      <v-text-field
                        class="v-text-field"
                        outlined
                        v-model="RegisterDisensa.nombres"
                        placeholder=""
                        name="nombres"
                        append-icon="mdi-user"
                        type="text"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      name="Cédula"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label><b>Cédula</b></label>
                      <v-text-field
                        class="v-text-field"
                        outlined
                        v-model="RegisterDisensa.documento"
                        :counter="10"
                        :rules="ciRules"
                        placeholder=""
                        name="documento"
                        append-icon="mdi-user"
                        type="text"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      name="Dirección"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label><b>Dirección</b></label>
                      <v-text-field
                        class="v-text-field"
                        outlined
                        v-model="RegisterDisensa.actividad_actual"
                        placeholder=""
                        name="actividad_actual"
                        append-icon="mdi-user"
                        type="text"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      name="Referencia"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label><b>Referencia</b></label>
                      <v-text-field
                        class="v-text-field"
                        outlined
                        v-model="RegisterDisensa.nombre_empresa"
                        placeholder=""
                        name="nombre_empresa"
                        append-icon="mdi-user"
                        type="text"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      name="celular"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label><b>Celular</b></label>
                      <v-text-field
                        class="v-text-field"
                        outlined
                        v-model="RegisterDisensa.celular"
                        :counter="10"
                        :rules="celularRules"
                        placeholder=""
                        name="celular"
                        append-icon="mdi-user"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      name="correo"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label><b>Correo electrónico</b></label>
                      <v-text-field
                        class="v-text-field"
                        outlined
                        v-model="RegisterDisensa.correo"
                        :rules="correoRules"
                        placeholder=""
                        name="correo"
                        append-icon="mdi-user"
                        type="text"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </ValidationProvider>
                    <!--<ValidationProvider
                      name="agreement"
                      rules="required"
                      v-slot="{ errors }"
                    >
                    <input
                        v-model="agreement"
                        name="agreement"
                        type="checkbox"
                      />
                      <label for="agreement" :error-messages="errors"> Hé leído y acepto los <a href="https://americanexpressexperiences.com/Tratamiento_de_Uso_de_Datos_BG_Campan__as_NADAL.pdf" target="_blank"  title="Términos y Condiciones">Términos y Condiciones</a>  para el tratamiento de mis datos</label>
                    
               
                    </ValidationProvider>-->
                   
                    <v-container fluid>
                      <v-row>
                        <v-col cols="12" md="12">
                          <label
                            ><b>
                              Seleccionar el punto donde desea poner su
                              franquicia.</b
                            ></label
                          >
                          <editable-map
                            ref="mapRef"
                            :zoom="zoom"
                            :center="center"
                            style="height: 500px; width: 100%"
                            v-if="!loadingData"
                          >
                            <l-tile-layer
                              :url="url"
                              :attribution="attribution"
                            ></l-tile-layer>

                            <v-marker-cluster>
                              <l-marker
                                v-for="(detector, index) in detectors_actual"
                                :key="'marker-' + index"
                                :draggable="true"
                                :lat-lng="[detector.lat, detector.lng]"
                                @drag="addMarker"
                              >
                                <l-popup>
                                  <b>ubicación para registrar </b></l-popup
                                >
                              </l-marker>
                            </v-marker-cluster>
                            <l-control-zoom
                              position="bottomright"
                            ></l-control-zoom>
                          </editable-map>

                          <div class="overlayacontrol">
                              <v-container class="white" style="background-color: transparent !important;">
                                  <v-row mb-6 no-gutters style=" height: 75px; ">
                                      <v-col style=" height: 35px; ">
                                          <v-card data-toggle="tooltip" title="Ubicación"  id="btnUbicacion" name="btnUbicacion" style=" border-radius:8px 8px  8px 8px !important;" @click="mylocation">
                                              <a  style="top:-3px;" class=" transparent abajomenu v-btn v-btn--flat v-btn--icon v-btn--round theme--ligh v-size--default">
                                                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANNSURBVHgBxVddTttAEJ5ZG6iqVkrfKlGicIKGp5C+kJ6g3KDhAmU5AckJcLhAww3gBISXBp5IT0AKqdTHSFRVA2Snsxvb2XWcxKRIfBJi7Z2db+ffQVgA7Xeygkif9ZoIj8q9oAWPhA+LgKAACFW9FKRasAAEPBMwq+BlQeb+KpBItEUIRSTI6fe87qOCDpt+TEKclLtBN4u+ucTtgizgkL7ysgLZ0CQP6/MuMJO4vSargHQQWadBAH1B0GVLO/yYC/8q9jktQ4j1D9dB8Gjidl7W2K37lraWpyjw/4izjX7Qn5BflVUURr4QHyG2vBfUMhN/y0spiA7GpCQ3e4cNyICL/Jd9JqzFBEjV0vXh0VxiHVNQdBm5d9rBWdAhQjB5YdwOHm4kYz5Rx5xI2l0jUqJa6WaSVGf43WAUV7UCnaTS8k3QPF+VOc70A9S6HswlPjo8kLCWia/Cx+7mTWM9ZT8tw1Mz+Xxt9zSSXbnFN3ZuOA0Elfo0XlNtglTRKaSXVVXvmTBZ8IDirL57pXbtPbdzEW5Hy9JP18UmBASOYvcsFHDk0hi+J850gxltY8XRpxt+rNALa5ZLZ7PXiGOSCMFMJF16kd+9JIKiSTKFeyNW6PpmyoQNX6dguOHUqRiag5kweKm2+PRJ9MykutEUTZKJ2CPNaUOiD08EhHHXs+HreRqNNuVhELq6aAste9AaDCETSInvznNIbFqtIml4UPxwyilKfy304hbX7VjZpTEDTS7BnYROCm/g5I1bTkgt859vOXjNsbJvfo9aYRemo8sydfuFGTJjDcf2nkO8LMS4HxNKe6/8K9CK9Y2bkARbo/e0DLiGxEOGHsSJs5fUYbtUIe6ljbb2W1nwl9R7vfZvp0wrd7pNhADTlMLyEw+Jex4SCW9MlJMRoLDQwczUJjeZGmSEHqkRqbk4D5okqXk/TUFyrupuwwpradabaTXU1UC6H1ds0lLvsJ6mf+anD482SR7t258+BpxMYXfr815RCe7Tyc8jJDkrRPM/9jjmuGSSpApZoDP8AXfS3PsoYucCPo9NxG2Kei+MrGNrOxyG1vJv0UjL8P8idi4x+rAzCcRzuJocoVnwbL8kFvrt5OHwSoFo6rVu+LAA/gHKJLEIOy+84QAAAABJRU5ErkJggg==" />
                                              </a>
                                          </v-card>
                                      </v-col>
                                  </v-row>
                              </v-container>
                          </div>

                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
                <ValidationProvider v-slot="{ errors}" rules="required" name="Términos">
                  <v-container fluid>
                    <v-row>
                      <v-col cols="2" md="2" style="padding-left: 35px">
                        <v-checkbox
                            v-model="Términos"
                            :error-messages="errors"
                            value="1"
                            type="checkbox"
                            required
                          >
                        </v-checkbox>
                      </v-col>
                      <v-col cols="10" md="10" style="align-self: center;">
                        <v-label>Hé leído y acepto los <a href="https://mardisenginefotos.blob.core.windows.net/bancoguayaquil/pdf/Tratamientobg.pdf" target="_blank"  title="Términos y Condiciones">Términos y Condiciones</a>  para el tratamiento de mis datos</v-label>
                      </v-col>
                    </v-row>
                  </v-container>
                  </ValidationProvider>
                <v-card-actions>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12" v-if="!invalid  && validated">
                        <vue-recaptcha
                          ref="recaptcha"
                          :sitekey="keychap"
                          align="center"
                          justify="center"
                          @verify="onVerify"
                          @expired="onExpired"
                        >
                        </vue-recaptcha>
                      </v-col>
                    </v-row>

                    <v-spacer></v-spacer>

                    <v-btn
                      large
                      :dark="!invalid && validated && verify"
                      @click="submit"
                      :disabled="!verify"
                      block
                      color="pink"
                      :loading="loading"
                    >
                      Finalizar
                    </v-btn>
                  </v-container>
                </v-card-actions>
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
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>

    <footer class="layout align-end justify-center">
      <p class="text-center footerText">
        Copyright © 2017-2022 CHARIOT Todos los derechos reservados |
        Desarrollado por DI
      </p>
    </footer>
    <v-overlay :value="loadingData">
      <v-progress-circular indeterminate size="84"
        >Guardando..</v-progress-circular
      >
    </v-overlay>
  </v-app>
</template>

<script>
 
 
import { LMarker, LTileLayer, LPopup, LControlZoom } from "vue2-leaflet";
import { EditableMap } from "vue2-leaflet-editable";
import Vue2LeafletMarkercluster from "vue2-leaflet-markercluster";
import activo from "@/assets/activo.png";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapActions, mapMutations, mapState } from "vuex";
import { http } from "@/plugins/axios";

import L from "leaflet";
import { VueRecaptcha } from "vue-recaptcha";



export default {
  name: "Register",
  components: {
    ValidationProvider,
    ValidationObserver,
    EditableMap,
    LMarker,
    LTileLayer,
    LPopup,

    LControlZoom,
    VueRecaptcha,
    "v-marker-cluster": Vue2LeafletMarkercluster,
  },

  created() {
    
    this.ObtenerDatos();
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.detectors_actual = [{ lat: pos.coords.latitude, lng: pos.coords.longitude },];
        this.center = L.latLng(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        console.log(err);
      }
    );
   console.log("Navigator Despues")
    let uri = window.location.hash.substring(14);
    let params = new URLSearchParams(uri);

    
    
    if (params.get("fuente") === 'BG')
            this.RegisterDisensa.proyecto='BG'
    if (params.get("fuente") === 'CER')
            this.RegisterDisensa.proyecto='CER'
    
     console.log(this.RegisterDisensa.proyecto)    




  },

  data() {
    return {
      Términos:false,
      colors: ["#ff0000", "#0000ff"],
      handlerOptions: {
        radius: 1,
        weight: 1,
      },
      src: {
        activo: activo,
        invactivo: activo,
      },
      keychap: "6LeUN9MjAAAAAIdZtrojVNdx7j22gVgC-QP3jMh6",
      detectors_actual: [],
      zoom: 6,
      center: L.latLng(-0.8475559, -78.9120594),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.41322, -1.219482),
      clusterOptions: {
        disableClusteringAtZoom: 2,
        chunkedLoading: true,
      },
      documento: "",
      ciRules: [
        (v) => v.length == 10 || "C.I. Inconsistente Verificar - 10 caracteres",
      ],
      nombres: "",
      apellidos: "",
      celular: "",
      celularRules: [
        (v) => v.substr(0, 2) == "09" || "CELULAR debe empezar con 09",

        (v) =>
          v.length == 10 || "CELULAR Inconsistente Verificar - 10 caracteres",
      ],
      correo: "",
      correoRules: [
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail invalido",
      ],
      fecha: "",
      fechaRules: [(v) => v.length > 3 || "Ingrese Fecha"],
      actividad_actual: "",
      nombre_empresa: "",
      info_finan: "",
      info_finanRules: [
        (v) => v.length > 0 || "INFORMACION FINANCIERA Inconsistente Verificar",
      ],
      info_comple: "",
      info_compleRules: [
        (v) => v.length > 0 || "At least one item should be selected",
      ],
      provincia: "",
      Provincias: [],
      ciudad: "",
      Ciudades: [],
      comentarios: "",
      checked: false,

      Totalciudades: [],
      Totalparroquias: [],
      loadingData: false,
      RegisterDisensa: {
        documento: "",
        nombres: "",
        apellidos: "",
        celular: "",
        correo: "",
        fecha: "2022-01-01",
        actividad_actual: "",
        nombre_empresa: "",
        info_finan: "",
        info_comple: "",
        provincia: "",
        ciudad: "",
        obsevaciones: "",
        latitud: 0,
        longitud: 0,
        imeid: "core_bancoBarrio",
        proyecto:""
        
      },
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
      cambiogeo: true,

      latitudActualiza: null,
      longitudactualizada: null,
      dialog: false,
      dialog2: true,
      verify: false,
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
    ...mapActions("auth"),
    ...mapMutations(["restoreErrors"]),
    onEvent() {
      // when you need a reCAPTCHA challenge
      this.$refs.recaptcha.execute();
    },
    onVerify: function (response) {
      if (response != null) this.verify = true;
    },
    onExpired: function () {
      console.log("Expired");
    },
    async submit() {
      if (this.RegisterDisensa.latitud == 0) {
        alert(
          "Necesitas ingresar una ubicación para poder guardar tu solicitud"
        );
        return;
      }
      try {
        this.loadingData = true;
        const response = await http.post(
          `/task/Inserta_Sensos`,
          this.RegisterDisensa
        );
        this.errorDownloadLink = response;
        window.scrollTo(0, 0);
        this.loadingData = false;
        this.dialog = true;
      } catch (e) {
        alert("ERROR AL OBTENER ARCHIVO DE ERRORES");
      } finally {
        this.loadingData = false;
      }
    },

    mylocation() {
    console.log("Entro a mylocation()")
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.detectors_actual = [
          { lat: pos.coords.latitude, lng: pos.coords.longitude },
        ];
        console.log("Geos")
        this.center = L.latLng(pos.coords.latitude, pos.coords.longitude);
        console.log("Geos")
        console.log("lat: " + pos.coords.latitude.toString() +" lon: "+ pos.coords.longitude.toString() )
      },
      (err) => {
        console.log(err);
      }
    );
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
        if (responsepa.status === "Ok") {
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
      this.Ciudad = [];
      this.Sector = [];
      this.Ciudades = [];
      this.Totalciudades.forEach((element) => {
        element.forEach((prov) => {
          if (prov.name == idProv) {
            let ciudades = prov.districts;
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
      this.Sector = [];
      this.Totalparroquias.forEach((element) => {
        element.forEach((dist) => {
          if (dist.id == id) {
            let parroq = dist.parishes;
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
    addMarker(event) {
      this.RegisterDisensa.latitud = event.latlng.lat;
      this.RegisterDisensa.longitud = event.latlng.lng;
      this.detectors_actual = [{ lat: this.RegisterDisensa.latitud, lng: this.RegisterDisensa.longitud },];
      this.center = L.latLng(this.RegisterDisensa.latitud, this.RegisterDisensa.longitud);
      this.cambiogeo = true;
      //this.markers.push(event.latlng);
      console.log("addMarker")
    },
    salir() {
      window.location.reload();
    },
  },
};
</script>

<style scoped lang="css">
@import "https://unpkg.com/leaflet@1.4.0/dist/leaflet.css";
@import "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css";

.overlayacontrol .v-sheet.v-card {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    height: 40px;
    text-align: center;
    padding-top: 5px;

}

.overlayacontrol {
    left: 87%;
    top: 78%;
    z-index: 1000;
    position: absolute;
    width: 65px;
    background-color: transparent !important;
}

.leaflet-container {
  height: 50vh;
}
.leaflet-popup-content-wrapper .leaflet-popup-tip {
  background: transparent !important;
  box-shadow: none !important;
}
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
.HeadText {
  font-size: 2.1rem;
  color: #160f41;

  margin: 0 0 20px;
  line-height: 1.4;
  font-weight: 700;
  text-transform: none;
  display: block;

  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

@media (max-width: 1700px) {
  .overlayacontrol {
      left: 82%;
      top: 78%;
      z-index: 1000;
      position: absolute;
      width: 65px;
      background-color: transparent !important;
  }
}


@media (max-width: 1279px) {
  .overlayacontrol {
      left: 76%;
      top: 78%;
      z-index: 1000;
      position: absolute;
      width: 65px;
      background-color: transparent !important;
  }
}

@media (max-width: 960px) {
  .overlayacontrol {
      left: 75%;
      top: 78%;
      z-index: 1000;
      position: absolute;
      width: 65px;
      background-color: transparent !important;
  }
}

@media (max-width: 640px) {
  .overlayacontrol {
      left: 76%;
      top: 76%;
      z-index: 1000;
      position: absolute;
      width: 65px;
      background-color: transparent !important;
  }
}

@media (max-width: 399px) {
  .overlayacontrol {
      left: 70%;
      top: 76%;
      z-index: 1000;
      position: absolute;
      width: 65px;
      background-color: transparent !important;
  }
}


</style>

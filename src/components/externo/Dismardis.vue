<template>
  <v-app>
    <v-main>
      <v-dialog v-model="dialog" persistent max-width="290">
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
                    <a href="">
                      <img
                        style="width: 12rem"
                        alt=""
                        src="/img/imagen1.jpg"
                        title="Logo Banco Guayaquil blanco"
                      />
                    </a>
                  </div>
                  <center>
                    <h2 type="INFORMACION" color="white" class="HeadText">
                      Conviértete en parte de nuestro equipo
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

                    <v-container fluid v-if="1 == 2">
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
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    large
                    :dark="!invalid && validated"
                    @click="submit"
                    :disabled="invalid || !validated"
                    block
                    color="pink"
                    :loading="loading"
                  >
                    Finalizar
                  </v-btn>
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

    "v-marker-cluster": Vue2LeafletMarkercluster,
  },

  created() {
    this.ObtenerDatos();

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.detectors_actual = [
          { lat: pos.coords.latitude, lng: pos.coords.longitude },
        ];
        this.center = L.latLng(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        console.log(err);
      }
    );
  },

  data() {
    return {
      colors: ["#ff0000", "#0000ff"],
      handlerOptions: {
        radius: 1,
        weight: 1,
      },
      src: {
        activo: activo,
        invactivo: activo,
      },

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
        imeid: "core_dismardis",
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

    async submit() {
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
      this.cambiogeo = true;
      //this.markers.push(event.latlng);
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
</style>

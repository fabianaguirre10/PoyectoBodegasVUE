<template>
  <v-app>
    <v-main>
      <v-dialog v-model="dialog" persistent max-width="300">
        <v-card>
          <v-img height="251" :src="src.findisensa"></v-img>
          <v-card-actions
            class="justify-center"
            style="background-color: #314a7c"
          >
            <v-btn color="#FFDD00" text @click="salir"> Salir </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6 lg6>
            <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
              <v-card class="elevation-5 pa-3">
                <v-card-text>
                  <center>
                    <v-alert type="INFORMACION" color="grey">
                      INFORMACION PERSONAL
                    </v-alert>
                  </center>
                  <v-form>
                    <ValidationProvider
                      name="documento"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label><b>C.I.:</b></label>
                      <v-text-field
                        class="v-text-field"
                        v-model="RegisterDisensa.documento"
                        :counter="10"
                        :rules="ciRules"
                        placeholder="C.I."
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
                      name="nombres"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label><b>Nombres:</b></label>
                      <v-text-field
                        class="v-text-field"
                        v-model="RegisterDisensa.nombres"
                        placeholder="nombres"
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
                      name="apellidos"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label><b>Apellidos:</b></label>
                      <v-text-field
                        class="v-text-field"
                        v-model="RegisterDisensa.apellidos"
                        placeholder="Apellidos"
                        name="apellidos"
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
                      <label><b>Celular:</b></label>
                      <v-text-field
                        class="v-text-field"
                        v-model="RegisterDisensa.celular"
                        :counter="10"
                        :rules="celularRules"
                        placeholder="Celular"
                        name="celular"
                        append-icon="mdi-user"
                        type="number"
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
                      <label><b>Correo electrónico:</b></label>
                      <v-text-field
                        class="v-text-field"
                        v-model="RegisterDisensa.correo"
                        :rules="correoRules"
                        placeholder="Correo"
                        name="correo"
                        append-icon="mdi-user"
                        type="text"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      name="fecha"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label><b>Fecha de Nacimiento:</b></label>
                      <v-text-field
                        class="v-text-field"
                        v-model="RegisterDisensa.fecha"
                        :rules="fechaRules"
                        placeholder="Fecha"
                        name="fecha"
                        append-icon="mdi-user"
                        type="date"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </ValidationProvider>
                    <center>
                      <v-alert type="INFORMACION" color="grey">
                        INFORMACION PROFESIONAL
                      </v-alert>
                    </center>
                    <ValidationProvider
                      name="actividad_actual"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label><b>Actividad Actual:</b></label>
                      <v-text-field
                        class="v-text-field"
                        v-model="RegisterDisensa.actividad_actual"
                        placeholder="Actividad Actual"
                        name="actividad_actual"
                        append-icon="mdi-user"
                        type="text"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      name="nombre_empresa"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label
                        ><b
                          >Nombre de la Empresa (Si actualmente trabaja):</b
                        ></label
                      >
                      <v-text-field
                        class="v-text-field"
                        v-model="RegisterDisensa.nombre_empresa"
                        placeholder="Nombre Empresa"
                        name="nombre_empresa"
                        append-icon="mdi-user"
                        type="text"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </ValidationProvider>
                    <center>
                      <v-alert type="INFORMACION" color="grey">
                        INFORMACION FINANCIERA
                      </v-alert>
                    </center>

                    <v-card flat>
                      <label
                        ><b
                          >Cuánto está dispuesto a invertir para la puesta en
                          marcha de la franquicia ?</b
                        >
                        Esto permitirá definir si usted tiene el perfil
                        económico requerido por la franquicia. Normalmente la
                        información de las franquicias es confidencial y solo se
                        proporcionan información a las personas que cumplen con
                        el perfil económico requerid</label
                      >
                      <v-card-text>
                        <v-container fluid>
                          <v-row>
                            <v-col cols="40" sm="40" md="0">
                              <v-radio-group
                                v-model="RegisterDisensa.info_finan"
                                :rules="info_finanRules"
                                column
                              >
                                <v-radio
                                  label="Desde USD 30.000"
                                  color="primary"
                                  value="1"
                                ></v-radio>
                                <v-radio
                                  label="De USD 30.000 a USD 50.000"
                                  color="primary"
                                  value="2"
                                ></v-radio>
                                <v-radio
                                  label="De USD 30.000 a USD 80.000"
                                  color="primary"
                                  value="3"
                                ></v-radio>
                                <v-radio
                                  label="De USD 80.000 a USD 120.000"
                                  color="primary"
                                  value="4"
                                ></v-radio>
                                <v-radio
                                  label="De USD 120.000 a USD 200.000"
                                  color="primary"
                                  value="5"
                                ></v-radio>
                                <v-radio
                                  label="De USD 200.000 a USD 300.000"
                                  color="primary"
                                  value="6"
                                ></v-radio>
                                <v-radio
                                  label="De USD 300.000 a USD 500.000"
                                  color="primary"
                                  value="7"
                                ></v-radio>
                                <v-radio
                                  label="Más de USD 500.000"
                                  color="primary"
                                  value="8"
                                ></v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                    </v-card>

                    <center>
                      <v-alert type="INFORMACION" color="grey">
                        INFORMACION COMPLEMENTARIA
                      </v-alert>
                    </center>

                    <v-card flat>
                      <label
                        ><b
                          >¿En Cuánto tiempo estima realizaría la inversión en
                          la franquicia?</b
                        ></label
                      >
                      <v-card-text>
                        <v-container fluid>
                          <v-row>
                            <v-col cols="20" sm="20" md="0">
                              <v-radio-group
                                v-model="RegisterDisensa.info_comple"
                                :rules="info_compleRules"
                                column
                              >
                                <v-radio
                                  label="De 1 a 3 meses."
                                  color="primary"
                                  value="1a3"
                                ></v-radio>
                                <v-radio
                                  label="De 4 a 6 meses."
                                  color="primary"
                                  value="4a6"
                                ></v-radio>
                                <v-radio
                                  label="De 7 meses a 1 año."
                                  color="primary"
                                  value="7anio"
                                ></v-radio>
                                <v-radio
                                  label="Más de 1 año."
                                  color="primary"
                                  value="mas_anio"
                                >
                                </v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                    </v-card>

                    <ValidationProvider
                      name="provincia"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label
                        ><b
                          >Provincia donde desea abrir la franquicia?:</b
                        ></label
                      >
                      <v-select
                        v-model="RegisterDisensa.provincia"
                        :items="Provincias"
                        label="Provincia"
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
                      <label
                        ><b>Ciudad donde desea abrir la franquicia?:</b></label
                      >
                      <v-select
                        v-model="RegisterDisensa.ciudad"
                        :items="Ciudades"
                        label="Ciudad"
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
                      name="Dirección"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label
                        ><b>Dirección donde desea abrir la franquicia</b></label
                      >
                      <v-text-field
                        class="v-text-field"
                        v-model="RegisterDisensa.direccion"
                        placeholder="Dirección"
                        name="direccion"
                        append-icon="mdi-user"
                        type="text"
                        color="accent"
                        autocomplete=""
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </ValidationProvider>
                    <v-container fluid>
                      <v-row>
                        <v-col cols="12" md="12">
                          <label
                            ><b
                              >Observaciones (Agregar alguna información
                              pertinente, o cuéntenos en motivo de su interés en
                              esta franquicia)</b
                            ></label
                          >
                          <v-textarea
                            v-model="RegisterDisensa.obsevaciones"
                            outlined
                            name="comentarios"
                            label="Comentarios"
                            value=""
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
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
                            <l-tile-layer :url="url"></l-tile-layer>

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
                    :dark="!invalid && validated"
                    @click="submit"
                    :disabled="invalid || !validated"
                    block
                    color="#FFDD00"
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
        Copyright © 2017-2022 CHARIOT Todos los derechos reservados
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
import disensafin from "@/assets/mensaje_fin_disensa.png";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapActions, mapMutations, mapState } from "vuex";
import { http } from "@/plugins/axios";
import { page } from "vue-analytics";
import L from "leaflet";

export default {
  name: "Disensa",
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
  mounted() {},
  created() {
    page("/");
    this.ObtenerDatos();

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.detectors_actual = [
          { lat: pos.coords.latitude, lng: pos.coords.longitude },
        ];
        5;
        this.center = L.latLng(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        console.log(err);
      }
    );
    // console.log(this.detectors_actual);
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
        findisensa: disensafin,
      },

      detectors_actual: [{ lat: -0.8475559, lng: -78.9120594 }],
      zoom: 12,

      center: L.latLng(-0.8475559, -78.9120594),
      url: "https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
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
        (v) =>
          v.length == 10 || "Celular Inconsistente Verificar - 10 caracteres",
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
        fecha: "",
        actividad_actual: "",
        nombre_empresa: "",
        info_finan: "",
        info_comple: "",
        provincia: "",
        ciudad: "",
        obsevaciones: "",
        latitud: 0,
        longitud: 0,
        imeid: "core_disensa",
        direccion: "",
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
      if (this.RegisterDisensa.latitud == 0) {
        alert("Debe ingresar una ubicacion antes de guardar");
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
      this.detectors_actual = [
        { lat: event.latlng.lat, lng: event.latlng.lng },
      ];
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
</style>

<template>
  <div class="pb-15">
    <v-dialog v-model="eraseDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{
          this.MessageCambioEstad
        }}</v-card-title>
        <v-card-text
          >¿Está seguro de cambiar de estado al producto?.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="deep-purple darken-4" text @click="close('E')"
            >Cancelar</v-btn
          >
          <v-btn
            color="deep-purple darken-4"
            v-if="this.MessageCambioEstad == 'Desactivar Producto'"
            dark
            @click="acceptDelete"
            >Aceptar</v-btn
          >
          <v-btn
            color="deep-purple darken-4"
            v-if="this.MessageCambioEstad == 'Activar Producto'"
            dark
            @click="acceptActive"
            >Aceptar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :vertical="vertical"
      :centered="true"
      :timeout="3000"
      center
      shaped
      color="red lighten-1"
    >
      {{ textbar }}
    </v-snackbar>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
         
          <v-card-subtitle>
            <v-row class="pl-3 pr-5 pt-2 mr-5">
              <h5 class="tText">Productos Foco</h5>
            </v-row>
          </v-card-subtitle>
          <v-card-text class="pa-0">
            <v-stepper v-model="step" class="elevation-0">
              <v-stepper-header class="elevation-0">
                <v-stepper-step :complete="step > 1" step="1" color="accent"
                  >Subir archivo</v-stepper-step
                >
                <v-divider></v-divider>

                <v-stepper-step
                  :complete="resumeComplete"
                  step="2"
                  color="accent"
                  >Resumen</v-stepper-step
                >
              </v-stepper-header>
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card class="mb-2 elevation-0" height="300px">
                    <v-card-text>
                      <v-file-input
                        v-model="file"
                        color="deep-purple accent-4"
                        counter
                        label="Archivo"
                        placeholder="Seleccione archivo a subir"
                        accept=".xls,.xlsx"
                        prepend-icon=""
                        outlined
                        height="120px"
                        :show-size="1000"
                      >
                        <template v-slot:selection="{ index, text }">
                          <v-row class="justify-center">
                            <v-chip
                              v-if="index < 2"
                              color="deep-purple accent-4"
                              dark
                              label
                              small
                            >
                              {{ text }}
                            </v-chip>
                          </v-row>
                        </template>
                      </v-file-input>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn
                        class="ml-2 text-capitalize"
                        color="deep-purple accent-4"
                        :loading="loadingData"
                        text
                        :dark="!fileInput && !lockUp"
                        @click="readFile"
                        :disabled="fileInput || lockUp"
                        >Subir</v-btn
                      >
                      <v-btn
                        class="text-capitalize"
                        color="deep-purple accent-4"
                        :dark="!parsedState"
                        @click="insertData"
                        :disabled="parsedState"
                      >
                        Continuar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card
                    class="background mb-2 elevation-0"
                    color="grey lighten-1"
                    height="300px"
                  >
                    <v-card-text class="pt-0">
                      <v-row>
                        <v-col class="elevation-1" cols="12" sm="6" md="6">
                          <v-container>
                            <h4>Datos Cargados</h4>
                            <v-progress-linear
                              v-if="uploadData !== null"
                              :active="true"
                              :background-opacity="0.3"
                              :buffer-value="100"
                              :height="15"
                              :value="
                                (successList.length * 100) / uploadData.length
                              "
                              color="success"
                            >
                              <template>
                                <strong>{{ successList.length }}</strong>
                              </template>
                            </v-progress-linear>
                          </v-container>
                          <v-container>
                            <h4>Errores</h4>
                            <v-progress-linear
                              v-if="uploadData !== null"
                              :active="true"
                              :background-opacity="0.3"
                              :buffer-value="100"
                              :height="15"
                              :value="
                                (errorList.length * 100) / uploadData.length
                              "
                              color="error"
                            >
                              <template>
                                <strong>{{ errorList.length }}</strong>
                              </template>
                            </v-progress-linear>
                          </v-container>
                        </v-col>
                        <v-col
                          class="align-self-center"
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-container class="text-center">
                            <v-btn
                              class="ma-2 text-capitalize"
                              medium
                              elevation="1"
                              color="error"
                              :href="errorDownloadLink"
                              download="Acme Documentation (ver. 2.0.1).txt"
                              :disabled="errorList.length <= 0"
                            >
                              <v-icon left>mdi-file-excel</v-icon>
                              Errores
                            </v-btn>
                          </v-container>
                        </v-col>
                      </v-row>
                    </v-card-text>
                 
                  </v-card>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              class="mr-4 mb-3 text-capitalize"
              color="error"
              text
              @click="finishImport"
              >Salir</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row>
      <v-col>
        <h1 class="tText">Administración de registros Loteria</h1>
      </v-col>
      <v-col class="align-self-center">
        <v-row class="justify-end">
      
          <v-dialog v-model="dialogProduct" persistent max-width="600px">
           
            <ValidationObserver
              ref="observer"
              tag="form"
              novalidate
              @reset.prevent="reset"
              v-slot="{ handleSubmit }"
            >
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="documento de identidad"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            class="v-text-field"
                            v-model="editedItem.documento"
                            :counter="10"
                            :rules="nameRules"
                            label="CI"
                            name="documento"
                            append-icon="mdi-user"
                            type="text"
                            color="accent"
                            autocomplete=""
                            :error-messages="errors"
                          >
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="nombres"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            class="v-text-field"
                            v-model="editedItem.person"
                            label="Nombres"
                            name="name"
                            append-icon="mdi-user"
                            type="text"
                            color="accent"
                            autocomplete=""
                            :error-messages="errors"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="apellidos"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                          
                            class="v-text-field"
                            v-model="editedItem.apellidos"
                            label="Apellidos"
                            name="apellidos"
                            append-icon="mdi-user"
                            type="text"
                            color="accent"
                            autocomplete=""
                            :error-messages="errors"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="Provincia"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-select
                            v-model="editedItem.idProvince"
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
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="Ciudad"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-select
                             v-model="editedItem.idDistrict"
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
                              {{ data.item.label }}
                            </template>
                          </v-select>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="Sector"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-select
                           v-model="editedItem.idParish"
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
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="direccion"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            class="v-text-field"
                             v-model="editedItem.direccion"
                            label="Dirección"
                            name="direccion"
                            append-icon="mdi-user"
                            type="text"
                            color="accent"
                            autocomplete=""
                            :error-messages="errors"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="telefono"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            class="v-text-field"
                              v-model="editedItem.telefono"
                            label="Teléfono"
                            name="telefono"
                            append-icon="mdi-user"
                            type="text"
                            color="accent"
                            autocomplete=""
                            :error-messages="errors"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="celular"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            class="v-text-field"
                            v-model="editedItem.celular"
                            label="Celular"
                            name="celular"
                            append-icon="mdi-user"
                            type="text"
                            color="accent"
                            autocomplete=""
                            :error-messages="errors"
                          ></v-text-field>
                        </ValidationProvider>
                         </v-col>
                         <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                            <ValidationProvider
                          name="estado"
                          rules="required"
                          
                        >
                        <v-select
                          v-model="editedItem.estadoRegistro"
                          :items="[{state:'Activo',abbr:1},{state:'Inactivo',abbr:0}]"
                          label="ESTADO*"
                          item-text="state"
                          item-value="abbr"
                          prepend-icon="mdi-book-remove-multiple"
                          required
                          color="accent darken-1"
                          :menu-props="{ top: false, offsetY: true }"
                        ></v-select>
                     
                         </ValidationProvider>
                      </v-col>
                        <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                            <ValidationProvider
                          name="estadoloteria"
                          rules="required"
                          
                        >
                        <v-select
                          v-model="editedItem.existeLoteria"
                          :items="[{state:'Rechazado',abbr:2},{state:'Si',abbr:1},{state:'No',abbr:0}]"
                          label="EXISTE LOTERÍA*"
                          item-text="state"
                          item-value="abbr"
                          prepend-icon="mdi-book-remove-multiple"
                          required
                          color="accent darken-1"
                          :menu-props="{ top: false, offsetY: true }"
                        ></v-select>
                     
                         </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="accent darken-1" text @click="close('P')"
                    >Salir</v-btn
                  >
                  <v-btn
                    color="accent darken-1"
                    dark
                   v-bind:disabled="btnDisable"
                    @click="handleSubmit(save)"
                    >Guardar</v-btn
                  >
                  <v-btn
                    color="accent darken-1"
                    dark
                   v-bind:disabled="btnDisable"
                    @click="handleSubmit(reeviar)"
                    >Reenviar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </ValidationObserver>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="justify-lg-space-between">
      <v-col class="pb-2">
        <v-card class="rounded-xl pa-3" rounded="true">
          <v-row class="align-baseline justify-space-between">
            <v-col cols="5" lg="4">
              <h3 class="tText pl-3">REGISTROS LOTERIA</h3>
            </v-col>
            <v-col class="text-top pr-3" lg="7">
              <v-text-field
                v-model="searchQuery"
                dense
                append-icon="mdi-magnify"
                placeholder="Buscar"
                outlined
                color="accent"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-data-table
            :headers="headersProduct"
            :items="registroItems"
            item-key="id"
            class="elevation-0"
            light
            :fixed-header="true"
            :loading="loadingProducts"
            :search="searchQuery"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small color="accent" class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon
                small
                color="success"
                v-if="item.estado == 'A'"
                @click="deleteItem(item)"
              >
                mdi-marker-check
              </v-icon>
              <v-icon
                color="error"
                v-if="item.estado == 'I'"
                @click="ActivarItem(item)"
              >
                mdi-bookmark-remove
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="info" dark>Reintentar</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import XLSX from "xlsx";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { http } from "@/plugins/axios";

var fileReader = new FileReader();

export default {
  //VALIDATE COMPONENTS FOR INPUT VALUES
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  //GET NECESARY INFO FROM SERVER
  created() {
    //this.getProductsFoco();
    // this.getCmbProductos();
    this.getRegistro();
    this.ObtenerDatos();
  },
  // SET DEFAULT VARIABLES TO MANAGE THE INFORMATION
  data() {
    return {
      snackbar: false,
      documento: "",
      textbar: "Lorem ipsum dolor sit amet",
      vertical: true,
      noMostrar: false,
      menui: false,
      menuf: false,
      fechaInicioLabel: null,
      fechaFinLabel: null,
      step: 1,
      dialog: false,
      searchQuery: "",
      resumeComplete: false,
      loadingData: false,
      lockUp: false,
      loadingProducts: false,
      errorList: [],
      successList: [],
      lockFinishOptions: true,
      errorDownloadLink: "",
      file: undefined,
      uploadData: null,
      MessageCambioEstad: "Eliminar Producto",
      headersProduct: [
        {
          text: "DOCUMENTO",
          align: "left",
          sortable: false,
          value: "documento",
        },
        {
          text: "NOMBRE",
          align: "left",
          sortable: true,
          value: "person",
        },
        {
          text: "APELLIDOS",
          align: "left",
          sortable: true,
          value: "apellidos",
        },
        {
          text: "PROVINCIA",
          align: "left",
          sortable: true,
          value: "province",
        },
        {
          text: "CANTON",
          align: "left",
          sortable: true,
          value: "district",
        },
        {
          text: "PARROQUIA",
          align: "left",
          sortable: true,
          value: "parish",
        },
        {
          text: "DIRECCIÓN",
          value: "direccion",
          align: "start",
          sortable: true,
        },
        {
          text: "TELÉFONO",
          value: "telefono",
          sortable: true,
          align: "center",
        },
        {
          text: "CELULAR",
          value: "celular",
          sortable: true,
          align: "center",
        },
        {
          text: "EXISTE LOTERIA",
          value: "estadoLoteriaText",
          sortable: true,
          align: "center",
        },
        {
          text: "ESTADO",
          value: "estadoEngineText",
          sortable: true,
          align: "center",
        },
        {
          text: "ACCIONES",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      listaCmbProductos: [],
      productItems: [],
      registroItems: [],
     nombres: "",
      apellidos: "",
      direccion: "",
      telefono: "",
      checked: false,
      Provincia: "",
      Provincias: [],
      Ciudad: "",
      Ciudades: [],
      Sector: "",
      Sectores: [],      
      Totalciudades: [],
      Totalparroquias: [],
      productsAccount: [],
      dialogProduct: false,
      eraseDialog: false,
      excelItem: {
        idfoco: 0,
        nombre: "",
        descripcion: "",
        fechaInicio: null,
        fechaFin: null,
        meta: 0,
        estado: "",
        idArticulo: [],
      },
      editedItem: {
        idfoco: 0,
        nombre: "",
        descripcion: "",
        fechaInicio: null,
        fechaFin: null,
        meta: 0,
        estado: "",
        idArticulo: [],
      },
      defaultItem: {
        idfoco: 0,
        nombre: "",
        descripcion: "",
        fechaInicio: null,
        fechaFin: null,
        meta: 0,
        estado: "",
        idArticulo: [],
      },
    };
  },
  // OBSERVER FOR FILE IMPORT DATA
  watch: {
    file(newVal) {
      if (newVal === undefined) {
        this.uploadData = null;
        this.lockUp = false;
      }
    },
  },
  computed: {
    //GET DATA FROM USER STORE
    ...mapGetters(["getUserData"]),

    //GET TITLE IF IS NEW OR UPDATE
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Producto" : "Editar Producto";
    },

    //CHECK IF THE FILE IS READY TO UPLOAD
    fileInput() {
      return this.file === undefined;
    },

    //CHECK IF A STATE ROUTE IS CHOISED
    parsedState() {
      return this.uploadData === null;
    },
  },
  methods: {
    // REALIZA UN PROGRESS LOADIND A NIVEL DE RAÍZ
    ...mapMutations(["setLoading"]),

    //GET CAMPAIGN DATA FOR FILE IMPORT
   
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
    async getRegistro() {
      try {
        console.log("Entro");
        this.loadingProducts = true;
        const response = await http.get(`/Registro/getRegistros`);
        if (response.status === "Ok") {
          this.registroItems = response.data;
          console.log("llegaron los registros");

          console.log(this.registroItems);
          if (this.registroItems) {
            this.registroItems.forEach((foco) => {
              var cbxProductos = [];
              if (foco.idArticulo) {
                foco.idArticulo.forEach((item) => {
                  var cbxProducto = {
                    value: item,
                    label: item,
                  };
                  cbxProductos.push(cbxProducto);
                });
                foco.idArticulo = cbxProductos;
              }
            });
          }
        } else {
          throw response.messege;
        }
      } catch (dataError) {
        alert(dataError);
      } finally {
        this.loadingProducts = false;
      }
    },
    async getProductsFoco() {
      try {
        this.loadingProducts = true;
        var idAcc = parseInt(this.getUserData.idAccount, 10);

        const response = await http.get(
          `/Order/getFocosWeb?Idaccount=${idAcc}`
        );
        if (response.status === "Ok") {
          this.productItems = response.data;
          console.log("llegaron los Focos");
          console.log(this.productItems);
          if (this.productItems) {
            this.productItems.forEach((foco) => {
              var cbxProductos = [];
              if (foco.idArticulo) {
                foco.idArticulo.forEach((item) => {
                  var cbxProducto = {
                    value: item,
                    label: item,
                  };
                  cbxProductos.push(cbxProducto);
                });
                foco.idArticulo = cbxProductos;
              }
            });
          }
        } else {
          throw response.messege;
        }
      } catch (dataError) {
        alert(dataError);
      } finally {
        this.loadingProducts = false;
      }
    },

    //GET THE FILE INPUT AND TRANSFORM IN AN JSON ARRAY
    parseFile(result) {
      try {
        this.loadingData = true;
        this.uploadData = null;
        var data = result;
        var workbook = XLSX.read(data, {
          type: "binary",
        });
        let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets["Hoja1"], {
          raw: true,
        });
        if (rowObject.length > 0) {
          let jsonObject = JSON.stringify(rowObject);
          var isValid = this.checkValidDocument(jsonObject);
          if (isValid) {
            var hasDuplicate = this.checkForDuplicate(jsonObject);
            if (!hasDuplicate) {
              this.uploadData = this.documentToString(jsonObject);
              this.lockUp = true;
            } else {
              alert("EL DOCUMENTO CONTIENE DATOS DUPLICADOS");
            }
          } else {
            alert("DOCUMENTO NO VALIDO, REVISE EL FORMATO ADECUADO");
          }
        } else {
          alert("DOCUMENTO NO VALIDO, REVISE EL FORMATO ADECUADO");
        }
        this.loadingData = false;
      } catch (e) {
        console.log(e);
      }
    },

    documentToString(data) {
      var jsonData = JSON.parse(data);
      const formated = jsonData.map(function (x) {
        x["Nombre"] = "" + x["Nombre"];
        x["Descripcion"] = "" + x["Descripcion"];
        x["Meta"] = "" + x["Meta"];
        x["ProductosFoco"] = "" + x["ProductosFoco"];
        x["Fecha_inicio"] = "" + x["Fecha_inicio"];
        x["Fecha_fin"] = "" + x["Fecha_fin"];
        return x;
      });

      return formated;
    },

    //CHECK IF THE INPUT FILE GET THE CURRENT HEADERS
    checkValidDocument(data) {
      var json = JSON.parse(data);

      if (
        "Nombre" in json[0] &&
        "Descripcion" in json[0] &&
        "Meta" in json[0] &&
        "ProductosFoco" in json[0] &&
        "Fecha_inicio" in json[0] &&
        "Fecha_fin" in json[0]
      ) {
        return true;
      } else {
        return false;
      }
    },

    //IF DUPLICATE DATA EXIST, THE FILE INPUT IS REJECTED
    checkForDuplicate(data) {
      var json = JSON.parse(data);
      var repeted = false;
      for (var i = 0, len = json.length; i < len; i++) {
        for (var j = 0, lenCopy = json.length; j < lenCopy; j++) {
          if (i !== j && json[i]["Nombre"] === json[j]["Nombre"]) {
            repeted = true;
            break;
          }
        }
        if (repeted) break;
      }
      return repeted;
    },

    //SET THE CURRENT PRODUCT TO BE EDITED
    editItem(item) {
      console.log("Editar");
      this.editedIndex = this.registroItems.indexOf(item);
      
      this.editedItem = Object.assign({}, item);
      this.ObtenerDatos();
      this.getCmbCiudades(item.idProvince);
       this.getCmbParishes(item.idDistrict);
      console.log(this.editedItem);
      this.noMostrar = true;
      this.dialogProduct = true;
    },

    //SET THE CURRENT PRODUCT TO BE DELETED
    deleteItem(item) {
      this.editedIndex = this.productItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.MessageCambioEstad = "Desactivar Producto";
      this.eraseDialog = true;
    },
    ActivarItem(item) {
      this.editedIndex = this.productItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.MessageCambioEstad = "Activar Producto";
      this.eraseDialog = true;
    },
    //SET DEFAULT ITEMS TO EMPTY DATA BY TYPE
    close(type) {
      if (type === "P") {
        this.dialogProduct = false;
        requestAnimationFrame(() => {
          this.$refs.observer.reset();
        });
      } else if (type === "E") {
        this.eraseDialog = false;
      }
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    //GUARDAR LOS CAMBIOS O EL NUEVO MERCADERISTA A LA LISTA
    async save() {
      var valid = this.$refs.observer.validate();

      

      if (!valid) return;

      console.log("GUARDO");

      try {
       
       

        
        console.log(this.editedItem);
        await http.post(`/Registro/transactionRegistro`, this.editedItem);
       this.getRegistro();
      } catch (e) {
        alert(e);
      } finally {
        this.close("P");
        this.setLoading(false);
      }
    },
async reeviar() {
      var valid = this.$refs.observer.validate();

      

      if (!valid) return;

      console.log("GUARDO");

      try {
       
       

        
        console.log(this.editedItem);
        await http.post(`/Location/ReenvioCodigo`, this.editedItem);
       this.getRegistro();
      } catch (e) {
        alert(e);
      } finally {
        this.close("P");
        this.setLoading(false);
      }
    },
    // ONLY DISABLE THE CURRENT PRODUCT FROM DATABASE
    async acceptDelete() {
      try {
        this.setLoading(true);
        this.loadingProducts = true;
        await http.post(`/Order/ActiveFoco?idfoco=${this.editedItem.idfoco}`);
        //getProductsFoco();
        console.log(
          this.productItems.findIndex((x) => x.idfoco == this.editedItem.idfoco)
        );
        this.productItems.find(
          (x) => x.idfoco == this.editedItem.idfoco
        ).estado = "I";
        //this.productItems.splice(this.productItems.findIndex(x=>x.idfoco==this.editedItem.idfoco),1);
      } catch (e) {
        alert(e);
      } finally {
        this.close("E");
        this.loadingProducts = false;
        this.setLoading(false);
      }
    },
    // ONLY DISABLE THE CURRENT PRODUCT FROM DATABASE
    async acceptActive() {
      try {
        this.setLoading(true);
        this.loadingProducts = true;
        await http.post(`/Order/ActiveFoco?idfoco=${this.editedItem.idfoco}`);
        this.productItems.find(
          (x) => x.idfoco == this.editedItem.idfoco
        ).estado = "A";
      } catch (e) {
        alert(e);
      } finally {
        this.close("E");
        this.loadingProducts = false;
        this.setLoading(false);
      }
    },
    //PREPARE FILE TO BE PARSED AND UPLOAD
    readFile() {
      if (this.file) {
        fileReader.readAsBinaryString(this.file);
        fileReader.onload = (e) => this.parseFile(e.target.result);
        fileReader.onerror = () => alert("Error al cargar el archivo");
      }
    },
    //UPLOAD EACH ARRAY ITEM FILE IMPORT TO SERVER
    async uploadDataToServer(itemData) {
      try {
        this.excelItem.idfoco = 0;
        this.excelItem.nombre = itemData["Nombre"].toString();
        this.excelItem.descripcion = itemData["Descripcion"].toString();
        this.excelItem.meta = parseInt(itemData["Meta"], 10);
        this.excelItem.fechaInicio =
          itemData["Fecha_inicio"].toString() + "T00:00:00";
        this.excelItem.fechaFin =
          itemData["Fecha_fin"].toString() + "T23:59:59";
        this.excelItem.estado = "A";
        this.excelItem.idaccount = parseInt(this.getUserData.idAccount, 10);

        var listaAux = itemData["ProductosFoco"].toString().split("-");

        this.excelItem.idArticulo = [];
        for (let i = 0; i < listaAux.length; i++) {
          this.excelItem.idArticulo.push(listaAux[i]);
        }

        const transactionDataExcel = {
          transaction: "I",
          foco: this.excelItem,
        };

        console.log("transactionFoco");
        console.log(transactionDataExcel);

        const response = await http.post(
          `/Order/transactionFoco`,
          transactionDataExcel
        );
        if (response.status === "error") {
          throw response;
        }
        this.successList.push(itemData);
      } catch (dataError) {
        if ("status" in dataError && "data" in dataError) {
          this.errorList.push(dataError.data);
        }
      } finally {
        console.log("");
      }
    },

    //IF ERRORS TO UPLOAD FILE ITEMS, GET A DOCUMENT
    async getErrorDocument() {
      try {
        const response = await http.post(
          `/Order/PrintErrorProduct`,
          this.errorList
        );
        this.errorDownloadLink = response.data;
      } catch (e) {
        alert("ERROR AL OBTENER ARCHIVO DE ERRORES");
      } finally {
        console.log("");
      }
    },

    //CALL A LOOP TO INSERT THE INFORMATION INTO SERVER
    insertData() {
      this.lockFinishOptions = true;
      this.step = 2;
      setTimeout(async () => {
        this.setLoading(true);
        for (var i = 0, len = this.uploadData.length; i < len; i++) {
          await this.uploadDataToServer(this.uploadData[i]);
        }

        if (this.errorList.length > 0) {
          await this.getErrorDocument();
        }
        this.setLoading(false);
        this.lockFinishOptions = false;
        this.resumeComplete = true;
      }, 630);
    },

    //CLEAN ALL STEPS CHOISES AND GO BACK TO FIRST STEP
    resetImport() {
      this.clearImportData();
      this.step = 1;
    },

    setearCampos() {
      this.fechaInicioLabel = null;
      this.fechaFinLabel = null;
      this.noMostrar = false;
    },

    //CLEAN ALL IMPORT DATA
    clearImportData() {
      this.file = undefined;
      this.successList = [];
      this.resumeComplete = false;
    },

    //CLEAN ALL IMPORT DATA AND CLOSE DIALOG
    finishImport() {
      this.dialog = false;
      this.resetImport();
      this.getProductsFoco();
      this.getCmbProductos();
    },
  },
};
</script>

<style scoped>
.tText {
  color: #232365;
  font-weight: 500;
  letter-spacing: 1px;
}
</style>

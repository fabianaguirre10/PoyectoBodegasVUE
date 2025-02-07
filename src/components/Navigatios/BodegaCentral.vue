<template>
  <div class="pb-15">
      <v-snackbar
        v-model="snackbar"
        :vertical="vertical"
        :centered="true"
        :timeout="3000"
        top
        shaped
        :color="tipoMensaje"
      >
        {{ textbar }}
    </v-snackbar>
    <v-dialog v-model="eraseDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{this.MessageCambioEstad}}</v-card-title>
        <v-card-text
          >¿Está seguro de cambiar de estado al producto?.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="deep-purple darken-4" text @click="close('E')"
            >Cancelar</v-btn
          >
          <v-btn color="deep-purple darken-4" v-if="this.MessageCambioEstad=='Desactivar Producto'" dark @click="acceptDelete"
            >Aceptar</v-btn
          >
           <v-btn color="deep-purple darken-4" v-if="this.MessageCambioEstad=='Activar Producto'" dark @click="acceptActive"
            >Aceptar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <h2 class="tText">Importar archivos</h2>
            <v-spacer />
            <v-btn
              class="pr-0 pl-0 ml-4 text-capitalize"
              text
              medium
              elevation="0"
              color="accent"
              href="../../assets/cargaLocales.xlsx"
              download="cargaLocales.xlsx"
            >
              <v-icon left>mdi-file-excel</v-icon>
              Formato
            </v-btn>
          </v-card-title>
          <v-card-subtitle>
            <v-row class="pl-3 pr-5 pt-2 mr-5">
              <h5 class="tText">Productos</h5>
            </v-row>
          </v-card-subtitle>
          <v-card-text class="pa-0">
            <v-stepper v-model="step" class="elevation-0">
              <v-stepper-header class="elevation-0">
                <v-stepper-step :complete="step > 1" step="1" color="accent">Subir archivo</v-stepper-step
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
                    <v-card-actions class="justify-center">
                      <v-btn
                        class="ml-2 text-capitalize"
                        text
                        @click="resetImport"
                        :disabled="lockFinishOptions"
                        >Importar Nuevo</v-btn
                      >
                      <v-btn
                        class="text-capitalize"
                        color="deep-purple accent-4"
                        :dark="!lockFinishOptions"
                        :disabled="lockFinishOptions"
                        @click="finishImport"
                      >
                        Terminar
                      </v-btn>
                    </v-card-actions>
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

        <v-row justify="center">
      <v-dialog v-model="dialogRegOrder" persistent max-width="950px">
              <v-card>
                <v-card-title >
                  <v-col cols="12" sm="12" md="12" class="pt-0 pb-0" style="text-align: center;">
                    <span class="headline">Detalle del Pedido</span>
                  </v-col>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-data-table
                        :headers="headersOrder"
                        :items="orders"
                        item-key="id"
                        class="elevation-0"
                        light
                        :fixed-header="true"
                        >
                        <template v-slot:[`item.actions`]="{ item }">
                          <v-icon color="error" class="mr-4" @click="removeItemOrder(item)">
                            mdi-delete-forever
                          </v-icon>
                        </template>
                        <template v-slot:no-data>
                          <v-btn color="info" dark 
                            >Reintentar</v-btn
                          >
                        </template>
                        </v-data-table>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="accent darken-1" text @click="close('O')"
                    >Salir</v-btn
                  >
                  <v-btn color="accent darken-1" text @click="sendOrder()"
                    >Enviar</v-btn
                  >
                </v-card-actions>
              </v-card>
      </v-dialog>
    </v-row>

    <v-row>
      <v-col>
        <h1 class="tText">Administración de Bodega</h1>
      </v-col>
      <v-col class="align-self-center">
        <v-row class="justify-end">
          <v-btn
            class="ma-2 text-capitalize"
            medium
            elevation="1"
            light
            color="secondary-text"
            @click="dialogRegOrder = !dialogRegOrder"
          >
            <v-icon left>mdi-truck-fast</v-icon>
            Pedido ({{this.orders.length}})
          </v-btn>
          <v-btn
            class="ma-2 text-capitalize"
            medium
            elevation="1"
            light
            color="secondary-text"
            @click="dialog = !dialog"
          >
            <v-icon left>mdi-file-excel</v-icon>
            Importar
          </v-btn>
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
                          name="code"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            v-model="editedItem.codigo"
                            name="code"
                            label="Código*"
                            prepend-icon="mdi-barcode-scan"
                            color="accent darken-1"
                            :error-messages="errors"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="sku"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            v-model="editedItem.sku"
                            name="sku"
                            label="Sku*"
                            prepend-icon="mdi-folder"
                            color="accent darken-1"
                            :error-messages="errors"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="cantidad"
                          rules="required|numeric"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            v-model="editedItem.cantidad"
                            name="cantidad"
                            label="Cantidad*"
                            prepend-icon="mdi-counter"
                            required
                            color="accent darken-1"
                            :error-messages="errors"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="precio"
                          rules="required|decimal"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            v-model="editedItem.precio"
                            name="precio"
                            label="Precio*"
                            prepend-icon="mdi-cash"
                            required
                            color="accent darken-1"
                            :error-messages="errors"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <v-select
                          v-model="editedItem.iva"
                          :items="['Si', 'No']"
                          label="Iva*"
                          prepend-icon="mdi-cash-multiple"
                          required
                          color="accent darken-1"
                          :menu-props="{ top: false, offsetY: true }"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <v-select
                          v-model="editedItem.impuesto_interno"
                          :items="['Si', 'No']"
                          label="Impuesto Interno*"
                          prepend-icon="mdi-cash-multiple"
                          required
                          color="accent darken-1"
                          :menu-props="{ top: false, offsetY: true }"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <v-select
                          v-model="editedItem.exento"
                          :items="['Si', 'No']"
                          label="Exento*"
                          prepend-icon="mdi-book-remove-multiple"
                          required
                          color="accent darken-1"
                          :menu-props="{ top: false, offsetY: true }"
                        ></v-select>
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
                    @click="handleSubmit(save)"
                    >Guardar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </ValidationObserver>
          </v-dialog>
          <v-dialog v-model="dialogOrder" persistent max-width="800px">
         
            <ValidationObserver
              ref="observer"
              tag="form"
              novalidate
              @reset.prevent="reset"
              v-slot="{ handleSubmit }"
            >
              <v-card>
                <v-card-title >
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" class="pt-0 pb-0" style="text-align: center;">
                        <label class="title">{{ editedItem.codigo + ' - ' + editedItem.sku }}</label>
                        <br>
                        <label class="title">Stock: {{ editedItem.cantidad}}</label>
                        <br><br>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="cantidad"
                          rules="required|numeric|min_value:1"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            v-model="cantidad_tranferir"
                            name="cantidad"
                            label="Cantidad*"
                            prepend-icon="mdi-counter"
                            color="accent darken-1"
                            required
                            type="number"
                            :error-messages="errors"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="12" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="estadomaterial"
                          rules="required"
                          v-slot="{ errors }"
                        >
                        <v-select
                          v-model="selected_estado_material"
                          :items="itemsAdd"
                          name="estadomaterial"
                          label="Estado Material*"
                          prepend-icon="mdi-cash-multiple"
                          required
                          color="accent darken-1"
                          :menu-props="{ top: false, offsetY: true }"
                          :error-messages="errors"
                        ></v-select>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="accent darken-1" text @click="close('A')"
                    >Salir</v-btn
                  >
                  <v-btn
                    color="accent darken-1"
                    dark
                    @click="handleSubmit(addItemOrder)"
                    >Agregar</v-btn
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
                                  <v-col cols="12" sm="12" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="transferir"
                          rules="required"
                          v-slot="{ errors }"
                        >
                        <v-select
                         v-model="selected_tipo_destino"
                         :items="itemsTipoDestino"
                         item-text="label"
                         item-value="value"
                         label="Transferir a*"
                         prepend-icon="mdi-cash-multiple"
                         persistent-hint
                         return-object
                         single-line
                         name="transferir"
                         :error-messages="errors"
                         @change="setScreen(selected_tipo_destino.value)"
                        ></v-select>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="12" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="destino"
                          rules="required"
                          v-slot="{ errors }"
                        >
                        <v-select
                         v-model="selected_destino"
                         :items="itemsDestino"
                         item-text="label"
                         item-value="value"
                         label="Destino*"
                         prepend-icon="mdi-cash-multiple"
                         persistent-hint
                         return-object
                         single-line
                         name="destino"
                         :disabled="unlockFields"
                         :error-messages="errors"
                         @change="setScreen2()"
                        ></v-select>
                        </ValidationProvider>
                      </v-col>
            <v-col cols="5" lg="3">
              <h3 class="tText pl-3">Productos Bodega Distribudor:</h3>
            </v-col>
            <v-col class="text-top pr-3" lg="9">
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
            :items="productItems"
            item-key="id"
            class="elevation-0"
            light
            :fixed-header="true"
            :loading="loadingProducts"
            :search="searchQuery"
          >
          <template v-slot:[`item.actions`]="{ item }">
              <v-icon small color="accent" class="mr-4" @click="addOrder(item)" :disabled="unlockFieldsTable">
                mdi-truck-fast
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="info" dark @click="getProducts"
                >Reintentar</v-btn
              >
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
import {
  required, min, max, email, max_value,min_value
} from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'

extend('required', required)
extend('email', email)
extend('min', min)
extend('max', max)
extend('max_value', max_value)
extend('min_value', min_value)

var fileReader = new FileReader();

export default {
  //VALIDATE COMPONENTS FOR INPUT VALUES
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  //GET NECESARY INFO FROM SERVER
  created() {
    this.getProducts();
    this.itemsAdd = [];
    this.itemsTipoDestino = [];
    this.itemsAdd.push("SIRVE");
    this.itemsAdd.push("NO SIRVE");
    this.itemsTipoDestino.push({label: "Distribuidor", value: 1});
    this.itemsTipoDestino.push({label: "Mercaderista", value: 2});
    this.itemsTipoDestino.push({label: "Evento", value: 3});
    this.itemsTipoDestino.push({label: "Banco", value: 4});
  },
  // SET DEFAULT VARIABLES TO MANAGE THE INFORMATION
  data() {
    return {
      snackbar: false,
      textbar: "",
      vertical: true,
      tipoMensaje:"green",
      step: 1,
      dialog: false,
      dialogRegOrder: false,
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
      MessageCambioEstad:"Eliminar Producto",
      headersOrder: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        // {
        //   text: "Tipo",
        //   align: "left",
        //   sortable: true,
        //   value: "tipo",
        // },
        // {
        //   text: "Origen",
        //   align: "left",
        //   sortable: true,
        //   value: "origen",
        // },
        {
          text: "DESTINO",
          align: "left",
          sortable: true,
          value: "destino",
        },
        {
          text: "COD. PROD.",
          align: "left",
          sortable: true,
          value: "codigoProducto",
        },
        {
          text: "PRODUCTO",
          align: "left",
          sortable: true,
          value: "producto",
        },
        {
          text: "CANTIDAD",
          align: "left",
          sortable: true,
          value: "cantidad",
        },
        {
          text: "EST. MATERIAL",
          align: "left",
          sortable: true,
          value: "estadoMaterial",
        },
        {
          text: "ACCIONES",
          value: "actions",
          align: "center",
          sortable: false,
        },
        ],
      headersProduct: [
        {
          text: "CÓDIGO",
          align: "left",
          sortable: true,
          value: "codigo",
        },
        { text: "SKU", value: "sku", align: "start", sortable: true },

    
        {
          text: "CANTIDAD",
          value: "cantidad",
          sortable: true,
          align: "center",
        },
        {
          text: "PRECIO",
          value: "precio",
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
      itemsAdd: [],
      itemsTipoDestino: [],
      itemsDestino:[],
      productItems: [],
      dialogProduct: false,
      dialogOrder: false,
      eraseDialog: false,
      editedItem: {
        id: 0,
        codigo: "",
        sku: "",
        iva: "Si",
        impuesto_interno: "Si",
        exento: "Si",
        cantidad: 0,
        precio: 0.0,
        idaccount: 0,
        estado_material: ""
      },
      itemOrder:{tipo:"",destino:"",cantidad:0,estadoMaterial:""},
      orders:[],
      ordersImport:[],
      selected_tipo_destino:null,
      selected_destino:"",
      cantidad_tranferir: 0,
      selected_estado_material:null,
      unlockFields: true,
      unlockFieldsTable:true,
      defaultItem: {
        id: 0,
        codigo: "",
        sku: "",
        iva: "Si",
        impuesto_interno: "Si",
        exento: "Si",
        cantidad: 0,
        precio: 0.0,
        idaccount: 0,
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
      let title = ""; 
      if(this.dialogOrder){
        title = "Agregar al Pedido";
      }else{
        title = this.editedIndex === -1 ? "Nuevo Producto" : "Editar Producto";
      }
      return title
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

    mostrarMesaje(mostrar,texto,tipo){
      this.snackbar = mostrar;
      this.textbar = texto
      this.tipoMensaje = tipo
    },
    //GET CAMPAIGN DATA FOR FILE IMPORT
    async getProducts() {
      try {
        this.setLoading(true);
        this.loadingProducts = true;
        var idAcc = parseInt(this.getUserData.idAccount, 10);

        const response = await http.post(`/surti/BodegaCentralList?account=${idAcc}&idusuario=${this.getUserData.idUser}`);
        if (response.status === "Ok") {
          this.productItems = response.data;
        } else {
          throw response.messege;
        }
      } catch (dataError) {
        alert(dataError);
      } finally {
        this.loadingProducts = false;
        this.setLoading(false);
      }
    },

    //GET THE FILE INPUT AND TRANSFORM IN AN JSON ARRAYdocumentToString
    parseFile(result) {
      try {
        this.loadingData = true;
        this.uploadData = null;
        var data = result;
        var workbook = XLSX.read(data, {
          type: "binary",
        });
        let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets["Formato"], {
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

    async setScreen(tipo){
      this.setLoading(true);
      this.unlockFields = true
      this.unlockFieldsTable = true;
      this.selected_destino = "";
      this.cantidad_tranferir;
      this.selected_estado_material = "";
      this.itemsDestino = [];
      let arreglo = await this.getActiveSellers(tipo);
      for(let i=0;i<arreglo.length;i++){
        this.itemsDestino.push({label: arreglo[i]['route'].toString(),value:arreglo[i]['id']})
      }
      this.unlockFields = false
      this.setLoading(false);
    },
    
    setScreen2(){
      this.unlockFieldsTable = false;
      this.getProducts();
      this.orders = [];
    },

    addItemOrder(){
      this.setLoading(false);
      console.log('combo',this.selected_destino.value.toString());
      console.log('sesion',this.getUserData.idDistribuidor);
      if(this.cantidad_tranferir >= this.editedItem.cantidad && (parseInt(this.selected_destino.value.toString()) !== parseInt(this.getUserData.idDistribuidor))){
        this.mostrarMesaje(true,"No existe stock suficiente","red");
      }
      else{
        let indice = 0;
        for(let i=0;i<this.orders.length;i++){
            // console.log(this.orders[i].id + " es mayor que " + indice);
            if(this.orders[i].id > indice){indice = this.orders[i].id; 
            // console.log("Encontro un candidato")
            }
        }
      this.productItems.forEach(element => {
          if(element.codigo.toString() == this.editedItem.codigo.toString()){
            if(parseInt(this.selected_destino.value.toString()) == parseInt(this.getUserData.idDistribuidor)){
              element.cantidad = parseInt(element.cantidad) + parseInt(this.cantidad_tranferir)
            }else{
              element.cantidad = parseInt(element.cantidad) - parseInt(this.cantidad_tranferir)
            }
          }
      });

      let item = {
        id: indice==0?1:indice+1,
        tipo: this.selected_tipo_destino.value,
        cuenta: parseInt(this.getUserData.idAccount.toString()),
        origen: this.getUserData.idDistribuidor,
        destino:this.selected_destino.value,
        idProducto: this.editedItem.id,
        codigoProducto: this.editedItem.codigo,
        producto: this.editedItem.sku,
        cantidad:this.cantidad_tranferir,
        estadoMaterial:this.selected_estado_material
        }

      console.log("Datos del usuario")
      console.log(this.getUserData)

      // console.log("ANTES: " + JSON.stringify(this.orders));
      this.orders.push(item);
      console.log("DESPUES: " + JSON.stringify(this.orders));
      this.dialogOrder = false;
      }
      this.setLoading(false);
    },

    removeItemOrder(item) {
      
      this.productItems.forEach(element => {
          if(element.codigo.toString() == this.editedItem.codigo.toString()){
            if(parseInt(this.selected_destino.value.toString()) == parseInt(this.getUserData.idDistribuidor)){
              element.cantidad = parseInt(element.cantidad) - parseInt(item.cantidad)
              console.log("ENTRO 1: " + item.cantidad.toString())
            }else{
              element.cantidad = parseInt(element.cantidad) + parseInt(item.cantidad)
              console.log("ENTRO 2: " + item.cantidad.toString())
            }
          }
      });
      // console.log("ANTES: " + JSON.stringify(this.orders));
      // console.log("REMOVE: " + JSON.stringify(item));
      // console.log("DESPUES: " + JSON.stringify(this.orders));
      // console.log("INDICE: " + this.orders.indexOf(item))
      this.orders.splice(this.orders.indexOf(item),1)
    },

    async getActiveSellers(tipo) {
      try {
        let idcuenta=this.getUserData.idAccount;
        var requestParams = {
          Iduser: this.getUserData.idUser,
          IdAccount: parseInt(idcuenta.toString()),
        };
        let api= ""
        console.log("requestParams: ",JSON.stringify(requestParams));
        if(tipo==1){api=`/Surti/ObtnerDistribuidoreActivos`}else if (tipo>1){api=`/Surti/ObtnerVenddoresActivos?tipo=${tipo}`}
        const response = await http.post(api, requestParams);
        console.log("API: ",response);
        if (response.status === "Ok") {
          return response.data;
        } else {
          throw response.messege;
        }
      } catch (dataError) {
        alert(dataError);
      } finally {
        this.loadingActiveRoutes = false;
      }
    },

    async sendOrderImport(){
      this.setLoading(true);
      console.log("Enviar Pedido Import");
      try {
        let optionCharge = 0;
        let estadoDetalles = "";
        let orderModel = {
          usuario: this.getUserData.idUser,
          order: {idorder: 0,idaccount:this.getUserData.idAccount,description: "",status:"finalizado",observation:"",image:"",origin:"",destination:""},
          details:[]
        }

        optionCharge = 1;
        orderModel.order.description = "ingreso";
        orderModel.order.origin = "0";
        orderModel.order.destination = this.getUserData.idDistribuidor.toString();
        estadoDetalles = "aceptado";

      let listaDetalles = [];
      console.log(this.ordersImport);
      console.log(this.getUserData.idDistribuidor);
      console.log(estadoDetalles);
      for(let j=0; j < this.ordersImport.length; j++){
        let item = {};
          item = {
            idorderdetail:0,
            idorder:0,
            description:"ingreso",
            idproduct: this.ordersImport[j].Id_Producto.toString(),
            quantity: parseInt(this.ordersImport[j].Cantidad),
            movement: "1",
            option: optionCharge,
            statusmaterial:"SIRVE",
            aceptation: estadoDetalles,
            };  
        listaDetalles.push(item);
              
      }
      orderModel.details = listaDetalles;

      console.log(orderModel);
      console.log("OBJETO POST");
      console.log(JSON.stringify(orderModel));

        const response = await http.post(`/Surti/LoadSendOrder`, orderModel);
        if (response.status === "error") {
          throw response;
        }
        
        this.successList.push("Correcto");
        this.dialogRegOrder = false;
        this.orders = [];
        this.mostrarMesaje(true,"Pedido creado Correctamente!!!","green");
      } catch (dataError) {
        if ("status" in dataError && "data" in dataError) {
          this.errorList.push(dataError.data);
        }
      } finally {
        console.log("");
      }
      this.setLoading(false);
    },

    async sendOrder(){
      this.setLoading(true);
      console.log("Enviar Pedido");
      try {
        let optionCharge = 0;
        let orderModel = {
          usuario: this.getUserData.idUser,
          order: {idorder: 0,idaccount:this.getUserData.idAccount,description: "ingreso",status:"pendiente",observation:"",image:"",origin:"",destination:""},
          details:[]
        }

        var estadoDetalles = "";

        if (parseInt(this.selected_destino.value.toString()) == parseInt(this.getUserData.idDistribuidor) && this.selected_tipo_destino.value == 1) {
            optionCharge = 1;
            orderModel.order.description = "ingreso";
            orderModel.order.origin = "0";
            orderModel.order.destination = this.selected_destino.value.toString();
            estadoDetalles = "aceptado";
        }else if(parseInt(this.selected_destino.value.toString()) != parseInt(this.getUserData.idDistribuidor)  && this.selected_tipo_destino.value == 1){
            optionCharge = 2;
            orderModel.order.description = "transferencia DD";
            orderModel.order.origin = this.getUserData.idDistribuidor;
            orderModel.order.destination = this.selected_destino.value.toString();
            estadoDetalles = "pendiente";
        }else if(this.selected_tipo_destino.value > 1){
            optionCharge = 3;
            orderModel.order.description = "transferencia DM";
            orderModel.order.origin = this.getUserData.idDistribuidor;
            orderModel.order.destination = this.selected_destino.value.toString();
            estadoDetalles = "pendiente";
        }



      let listaDetalles = [];
      console.log(this.orders);
      console.log(this.getUserData.idDistribuidor);
      console.log(this.selected_tipo_destino);



      for(let j=0; j < this.orders.length; j++){
        let item = {};
          item = {
            idorderdetail:0,
            idorder:0,
            description:orderModel.order.description,
            idproduct:this.orders[j].codigoProducto.toString(),
            quantity: parseInt(this.orders[j].cantidad),
            movement:"1",
            option: optionCharge,
            statusmaterial:this.orders[j].estadoMaterial.toString(),
            aceptation: estadoDetalles,
            };  
        listaDetalles.push(item);
      }

      orderModel.details = listaDetalles;

      console.log(orderModel);
      console.log("OBJETO POST");
      console.log(JSON.stringify(orderModel));

        const response = await http.post(`/Surti/LoadSendOrder`, orderModel);
        if (response.status === "error") {
          throw response;
        }
        
        this.successList.push("Correcto");
        this.dialogRegOrder = false;
        this.orders = [];
        this.mostrarMesaje(true,"Pedido creado Correctamente!!!","green");
      } catch (dataError) {
        if ("status" in dataError && "data" in dataError) {
          this.errorList.push(dataError.data);
        }
      } finally {
        console.log("");
      }
      this.setLoading(false);
    },

    documentToString(data) {
      var jsonData = JSON.parse(data);
      const formated = jsonData.map(function(x) {
        x["Id_Producto"] = "" + x["Id_Producto"];
        x["Nombre_Producto"] = "" + x["Nombre_Producto"];
        x["Cantidad"] = "" + x["Cantidad"];
        x["Descripcion"] = "" + x["Descripcion"];
        return x;
      });

      return formated;
    },

    //CHECK IF THE INPUT FILE GET THE CURRENT HEADERS
    checkValidDocument(data) {
      var json = JSON.parse(data);

      if (
        "Id_Producto" in json[0] &&
        "Nombre_Producto" in json[0] &&
        "Cantidad" in json[0] &&
        "Descripcion" in json[0]
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
      for (var i, len = json.length; i < len; i++) {
        for (var j, lenCopy = json.length; j < lenCopy; j++) {
          if (i !== j && json[i]["Id_Producto"] === json[j]["Id_Producto"]) {
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
      this.editedIndex = this.productItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // console.log(this.editedItem);
      this.dialogProduct = true;
    },

    addOrder(item) {
      // console.log("addOrder: " + JSON.stringify(this.orders));
      this.cantidad_tranferir = 0;
      this.selected_estado_material = "";
      this.itemsAdd.push("SIRVE");
      this.itemsAdd.push("NO SIRVE");
      this.editedIndex = this.productItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // console.log(this.editedItem);
      // console.log(JSON.stringify(this.itemsAdd));
      this.dialogOrder = true;
    },

    //SET THE CURRENT PRODUCT TO BE DELETED
    deleteItem(item) {
      this.editedIndex = this.productItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.MessageCambioEstad="Desactivar Producto"
      this.eraseDialog = true;
    },
      ActivarItem(item) {
      this.editedIndex = this.productItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.MessageCambioEstad="Activar Producto"
      this.eraseDialog = true;
    },
    //SET DEFAULT ITEMS TO EMPTY DATA BY TYPE
    close(type) {
      if (type === "P") {
        this.dialogProduct = false;
        requestAnimationFrame(() => {
          this.$refs.observer.reset();
        });
      }
      else if (type === "A") {
        this.dialogOrder = false;
        requestAnimationFrame(() => {
          this.$refs.observer.reset();
        });
      }
      else if (type === "E") {
        this.eraseDialog = false;
      }
      else if (type === "O") {
        this.dialogRegOrder = false;
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
      try {
        this.setLoading(true);
        this.editedItem["idaccount"] = parseInt(this.getUserData.idAccount, 10);
        this.editedItem["cantidad"] = Number(this.editedItem["cantidad"]);
        this.editedItem["precio"] = Number(this.editedItem["precio"]);
        // console.log(this.editedItem);
        var type = "";
        if (this.editedIndex > -1) {
          //EDITAR ITEM
          type = "U";
        } else {
          //AÑADIR NUEVO
          type = "I";
        }
        const transactionData = {
          transaction: type,
          product: this.editedItem,
        };
        await http.post(`/Order/transactionProduct`, transactionData);
        this.getProducts();
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

        // console.log(this.productItems);
        await http.post(`/Order/DeleteProduct?idproduct=${this.editedItem.id}`);
        this.productItems.find(x=>x.id==this.editedItem.id).estado='INACTIVO';
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
        await http.post(`/Order/ActiveProduct?idproduct=${this.editedItem.id}`);
         this.productItems.find(x=>x.id==this.editedItem.id).estado='ACTIVO';
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
      console.log("uploadDataToServer");
      try {

        try {
          // console.log(itemData);
          itemData.Id_Producto = itemData.Id_Producto.toString();
          itemData.Cantidad= itemData.Cantidad.toString();
          itemData.Nombre_Producto = itemData.Nombre_Producto.toString();
          itemData.Descripcion = itemData.Descripcion.toString();
                } catch (error) {
          alert("Error en los formatos del archivo refresque la pagina y vuelva a cargar");
      }
        
        let idcuenta=this.getUserData.idAccount;
        var uploadHeaderData = {
          account: parseInt(idcuenta.toString()),
          iduser: this.getUserData.idUser,
          option: 1,
          stockCamion: itemData,
        };

        console.log("este es el item: ");
        console.log(JSON.stringify(uploadHeaderData));
        const response = await http.post(`/Surti/LoadStockBC`, uploadHeaderData);
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
      console.log("insertData");
      this.lockFinishOptions = true;
      this.step = 2;
      setTimeout(async () => {
        this.setLoading(true);
        console.log("insertData " + this.uploadData.length.toString());
        this.ordersImport = [];
        for (var i = 0, len = this.uploadData.length; i < len; i++) {
           console.log("insertData FOR" + i.toString());
          this.ordersImport.push(this.uploadData[i])
        }
        await this.sendOrderImport();
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

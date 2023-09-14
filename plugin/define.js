import { OuterbasePluginTableConfiguration_$PLUGIN_ID } from "./table/config"
import { OuterbasePluginTable_$PLUGIN_ID } from "./table/table"

window.customElements.define('outerbase-plugin-table-$PLUGIN_ID', OuterbasePluginTable_$PLUGIN_ID)
window.customElements.define('outerbase-plugin-table-configuration-$PLUGIN_ID', OuterbasePluginTableConfiguration_$PLUGIN_ID)
import { OuterbasePluginTableConfiguration } from "./table/config"
import { OuterbasePluginTable } from "./table/table"

window.customElements.define('outerbase-plugin-table-$PLUGIN_ID', OuterbasePluginTable)
window.customElements.define('outerbase-plugin-table-configuration-$PLUGIN_ID', OuterbasePluginTableConfiguration)
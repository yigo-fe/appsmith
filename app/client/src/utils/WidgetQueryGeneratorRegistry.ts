import {$t} from "locale/index";
import { error } from "loglevel";

export default class WidgetQueryGeneratorRegistry {
  private static queryGeneratorMap = new Map();

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static register(id: string, queryGenerator: any) {
    if (WidgetQueryGeneratorRegistry.queryGeneratorMap.has(id)) {
      error($t('WidgetQueryGeneratorRegistry.bdd003390e474ce3'), id);

      return;
    }

    WidgetQueryGeneratorRegistry.queryGeneratorMap.set(id, queryGenerator);
  }

  static clear() {
    WidgetQueryGeneratorRegistry.queryGeneratorMap.clear();
  }

  static get(id: string) {
    const queryAdaptor = WidgetQueryGeneratorRegistry.queryGeneratorMap.get(id);

    if (!queryAdaptor) {
      error($t('WidgetQueryGeneratorRegistry.36a081fa6d5e66d8'), id);

      return;
    }

    return queryAdaptor;
  }

  static has(id: string) {
    return WidgetQueryGeneratorRegistry.queryGeneratorMap.has(id);
  }
}

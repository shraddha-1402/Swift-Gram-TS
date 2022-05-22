import { Server, Registry } from "miragejs";
import { ModelDefinition, FactoryDefinition } from "miragejs/-types";

declare function makeServer({
  environment,
}?: {
  environment?: string | undefined;
}): Server<
  Registry<
    Record<string, ModelDefinition<{}>>,
    Record<string, FactoryDefinition<{}>>
  >
>;

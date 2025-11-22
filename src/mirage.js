import { createServer, Model, Response } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    models: {
      record: Model,
    },

    seeds(server) {
      server.db.loadData({
        records: [],
      });
    },

    routes() {
      this.namespace = "api";

      // Get all calculation history records
      this.get("/history", (schema) => {
        return schema.records.all();
      });

      // Save a new calculation to history
      this.post("/history", (schema, request) => {
        try {
          const data = JSON.parse(request.requestBody);

          // Validate required fields
          if (!data.operation || data.result === undefined) {
            return new Response(
              400,
              {},
              { error: "Missing required fields: operation and result" },
            );
          }

          // Add timestamp if not provided
          const record = schema.records.create({
            ...data,
            timestamp: data.timestamp || new Date().toISOString(),
          });

          return record;
        } catch {
          return new Response(400, {}, { error: "Invalid request body" });
        }
      });

      // Get currency exchange rates
      // Returns rates with timestamp for tracking "last updated" time
      this.get(
        "/rates",
        () => {
          return {
            timestamp: new Date().toISOString(),
            rates: {
              USD: { EUR: 0.94, AUD: 1.56, CAD: 1.38, JPY: 154.525 },
              EUR: { USD: 1.07, AUD: 1.66, CAD: 1.47, JPY: 164.132 },
              AUD: { EUR: 0.61, USD: 0.64, CAD: 0.89, JPY: 99.0964 },
              CAD: { EUR: 0.68, USD: 0.72, AUD: 1.13, JPY: 111.885 },
              JPY: { EUR: 0.00609, USD: 0.00647, AUD: 0.01009, CAD: 0.00894 },
            },
          };
        },
        { timing: 2000 }, // Reduced to 2 seconds for better dev experience
      );

      // Optional: Add a passthrough for any unhandled routes
      // This allows real API calls if Mirage doesn't handle them
      this.passthrough();
    },
  });
}

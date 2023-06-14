export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            description: "A simple CRUD application made with Express... CODERHOUSE!",
        },
    },
    apis: ["./docs/**/*.yaml"]
}
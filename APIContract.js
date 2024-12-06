{
    "openapi": "3.0.3",
    "info": {
      "title": "fish2eat-mlapi",
      "description": "",
      "version": "1.0.0",
      "contact": {}
    },
    "servers": [
      {
        "url": "https://ml-backend-b5eefj7raq-et.a.run.app"
      }
    ],
    "paths": {
      "/predict-fish-info/": {
        "post": {
          "summary": "ML image scan fish",
          "description": "",
          "operationId": "postpredictfishinfo",
          "parameters": [],
          "responses": {
            "200": {
              "description": "New Request Copy",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "example": {
                      "prediction": {
                        "class": "Sapu-sapu",
                        "confidence": "99.94%"
                      },
                      "fish": {
                        "id": "fishID10",
                        "habitat": "Freshwater",
                        "scientificName": "Hypostomus plecostomus",
                        "imageURL": "https://freshwaterbiodiversity.org.bd/wp-content/uploads/2024/08/Hypostomus-plecostomus.jpg",
                        "name": "Sapu-sapu",
                        "description": "Brown to olive-brown body with darker spots or vermiculated patterns, and a pale cream abdomen with brown spots. The upper parts of the head and body are covered in longitudinal rows of armor-like scutes, while the lower surface of the head and abdomen is naked soft skin."
                      },
                      "recipes": [
                        {
                          "id": "Qwx7x7FldfMY3hFhSBtL",
                          "cookMethode": "Roast",
                          "ingredient": "1/2 cup all-purpose flour 1/2 teaspoon fine salt, or to taste 1/4 teaspoon freshly ground black pepper, or to taste 1/4 teaspoon paprika 1 pound fish fillets, such as haddock, tilapia, or cod Vegetable oil, for frying  Lemon wedges, tartar sauce, or rémoulade, optional",
                          "instruction": "In a shallow bowl or deep plate, combine the flour, salt, pepper, and paprika. Mix well. Dip 1 or 2 fish fillets into the flour mixture. Make sure they are completely coated on all sides. Gently shake off any excess. Repeat with the remaining fillets. Pour about 1/2-inch of oil into a large skillet and heat over medium-high heat until the oil shimmers. Working in batches, fry the fillets until golden brown and crisp, about 6 minutes. Turn with tongs and continue cooking until golden brown, crisp, and cooked through, about 6 minutes more. Transfer to a cooling rack to drain. Serve hot with lemon wedges, tartar sauce, or homemade rémoulade sauce, if desired. Enjoy.",
                          "imageURL": "https://www.thespruceeats.com/thmb/dFZJpr2T47-ND-ISjTTvhRbjowc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/easy-fried-fish-fillets-3056505-Final-5b9fc8b6c9e77c0050cd8171.jpg",
                          "fishId": "fishID10"
                        }
                      ]
                    }
                  }
                }
              }
            }
          },
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "file": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/fish-info/Mujair": {
        "get": {
          "summary": "Get fish recipes detailes",
          "description": "",
          "operationId": "getfishinfoMujair",
          "parameters": [],
          "responses": {
            "200": {
              "description": "New Request Copy",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "example": {
                      "fish": {
                        "id": "fishID6",
                        "habitat": "Freshwater",
                        "scientificName": "Oreochromis mossambicus",
                        "imageURL": "https://en.bdfish.org/wp-content/uploads/2010/02/Oreochromis-mossambicus.jpg",
                        "name": "Mujair",
                        "description": "This species is silver to gray with between two and seven black blotches along the side of the body. There are also black bars that extend from these blotches to the dorsal fins, and breeding males are charcoal gray to black with a white to yellow gold throat and cheek."
                      },
                      "recipes": []
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "components": {
      "schemas": {},
      "securitySchemes": {
        "basicAuth": {
          "type": "http",
          "scheme": "basic"
        },
        "digestAuth": {
          "type": "http",
          "scheme": "digest"
        }
      }
    },
    "tags": []
  }
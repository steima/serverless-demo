# serverless demo

Contains some simple serverless demo services.

## Run it

Install serverless framework (globally).

```bash
npm install -g serverless
```

Install dependencies in the root folder of the project.

```bash
npm install
```

## Deploy it

In each of the sub-folders in `services`/ folders execute, starting with resources: 

```bash
sls deploy
```

To remove the APIs from your account run:

```bash
sls remove
```
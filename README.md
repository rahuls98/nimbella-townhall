__API Documentation__ : https://documenter.getpostman.com/view/13222079/TVYF8eRz<br/>
__Frontend code__ : https://github.com/krishnakeshan/townhall

## Setup
Use the "hello world" template to start with:
```
> nim project create project_name
> nim project deploy project_name
```

Place folders within template and deploy the project:
```
project_name/packages/login
project_name/packages/submitIssue
project_name/packages/getIssues
.
.
.
```

Invoking action with the cli:
```
> nim action invoke action_name
```

Getting action url:
```
> nim action get action_name --url
```

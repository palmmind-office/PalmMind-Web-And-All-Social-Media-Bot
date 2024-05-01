export var userValidationModule = {
    data: {},
    errors: {},
    init: function (data) {
        this.data = data
        this.validate()
        this.renderError()

    },
    validate: function () {
        this.data.data.map(element => {
            let inputData = $(`#${element.id}`).val()
            $(`#${element.id}`).focus((e) => {
                $(`#${element.id}`).parent().children().remove('.error');
            })
            this.errors[element.id] = [];
            let validationKeys = Object.keys(element.validation).filter(data => element.validation[data])
            for (let params of validationKeys) {
                if (params === 'required') {
                    if (!inputData) {
                        this.errors[element.id].push(`${element.label} is required !!!`);
                    }
                }
                if(params === "fullname"){
                    let isname = inputData.length
                    if(isname<5){
                        this.errors[element.id].push(`${element.label} must be 5 character !!!`);
                    }
                }
                if (params === 'email') {
                    if (inputData) {
                        let regex = /^(\d{10})|([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                        let isMail = regex.test(inputData);
                        if (!isMail) {
                            this.errors[element.id].push(`${element.label} is incorrect !!!`);
                        }
                    }
                }
                if (params === 'mobile') {
                    let mobRegex = /^\d{10}$/;
                    let isMobile = mobRegex.test(inputData);
                    if (!isMobile) {
                        this.errors[element.id].push('Enter 10 digit mobile number !!!');
                    }
                }
                if(params === 'problem'){
                    let isProblem = inputData.length
                    if (isProblem <= 20) {
                        this.errors[element.id].push('There must be 20 characters in the problem !!!');
                    }
                }
                if(params === 'suggestion'){
                    let suggestion = inputData.length
                    if (suggestion <= 20) {
                        this.errors[element.id].push('There must be 20 characters in the suggestion !!!');
                    }
                }
            }
            if(element.data){
                let droper_val = element.data[0].for
                if(inputData === droper_val){
                    this.errors[element.id].push('Select your category !!!');
                }
            }

        })


    },
    renderError: function () {
        Object.keys(this.errors).forEach((id, index) => {
            let $errorParent = $(`#${id}`).parent();
            $errorParent.children().remove('.error');
            if (this.errors[id].length) {
                let $error = $('<p class="error"></p>');
                $error.text(this.errors[id][0]);
                $error.appendTo($errorParent);
            }
        });

    },
    checkError: function () {
        let error = false;
        let keys = Object.keys(this.errors);

        for (let i = 0; i < keys.length; i++) {
            if (this.errors[keys[i]].length) {
                error = true;
                break;
            }
        }
        return error;

    }
}




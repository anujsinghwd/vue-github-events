var githubTimeline = new Vue({
    el: '#timeline-app',
    data: {
        message: null,
        timeline_data: null,
        input: '',
        fullscreenLoading: true
    },
    mounted: function(){
        let events = this.apiCall('anujsinghwd');
        events.then(res => {
            this.message = res[0].created_at;
            this.timeline_data = res;
            this.fullscreenLoading = false;
        })
        .catch((err) => {
            this.errNotification(err.response.statusText, err.response.data.message)
            this.fullscreenLoading = false;
        });
    },
    methods: {
        errorHandler: function() {
            return true
        },
        apiCall: async function(user){
            const response = await axios.get(`https://api.github.com/users/${user}/events`);
            const data = response.data;
            return data;
        },
        errNotification: function(title, mssg){
            this.$notify.error({
                title: title,
                message: mssg
            });
        },
        usernameHandler: function(e){
            this.input = e;
            this.fullscreenLoading = true;
            let events = this.apiCall(this.input);
            events.then(res => {
                if(res.length > 0){
                    this.message = res[0].created_at;
                    this.timeline_data = res;
                }
                this.fullscreenLoading = false;
            })
            .catch((err) => {
                this.errNotification(err.response.statusText, err.response.data.message)
                this.fullscreenLoading = false;
            });
        }
    }
});
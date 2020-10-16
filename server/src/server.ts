import { app } from './app';

app.listen(process.env.PORT || 3333, () => console.log("> Listening app on port 3333"));
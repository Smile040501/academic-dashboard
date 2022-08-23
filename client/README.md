# Alumni-Cell React

## Setup

-   Go to the Project Directory containing `package.json` file and run

    ```sh
    $ npm install
    ```

    Make sure to have [NodeJS](http://nodejs.org/ "NodeJS") and [NPM](https://npmjs.org/ "NPM") installed on your system.

-   Create a file named `.env.local` in the same folder as that of `package.json`.

-   Copy the below contents and paste them to `.env.local` file.

    **_Note : Do not put any extra spaces or any newline in `.env.local` file._**

    ```
    REACT_APP_API_URL="http://localhost:8000/api/"
    REACT_APP_GCID="9233130693-9fmpcl90nbpibmj0rbq0vnsi80sp9ma1.apps.googleusercontent.com"
    REACT_APP_BCID="YOUR_BACKEND_CLIENT_ID_AS_STRING"
    REACT_APP_BSEC="YOUR_BACKEND_CLIENT_SECRET_AS_STRING"
    REACT_APP_DOMAIN="http://localhost:8000"
    ```

    **_Important : Do not disclose Google Client Id and Google Client Secret to anyone who is not contributor of this project._**

-   Don't modify `REACT_APP_API_URL` and `REACT_APP_DOMAIN` environment variables (Port `8000` is where Django server is running).

-   `REACT_APP_GCID` is the **_Google_Client_Id_**.\
    It should be working fine and there is no need to change it unless it is changed by the owner of Google Client Id.

    In case it is not working, go to [Google Developers Console](https://console.cloud.google.com/home/dashboard) and create a new app there. Go to `API Dashboard` and register for `OAuth consent screen` under `Testing` mode. Then go to `Credentials` and create a new `OAuth 2.0 Client Id`.

    You will get your app's **_Google_Client_Id_** and **_Google_Client_Secret_**.\
    Copy **_Google_Client_Id_** and paste it as _string_ under `REACT_APP_GCID`.

    **_Note: The same `Google_Client_Id` and `Google_Client_Secret` are to be used in `.env` file of the backend Django._**

-   For setting `REACT_APP_BCID` and `REACT_APP_BSEC`, see [README.md](https://github.com/Smile040501/alumnisite/blob/master/README.md) of backend.

-   Start the server using

    ```sh
    $ npm start
    ```

    Keep the backend server running while running frontend server.

-   You can visit [localhost:3000](http://localhost:3000/) in your browser to see the application running.

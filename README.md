# Bambee Task

Homework for Bambee FS Dev

## Running the app

#### Terminal #1:
```
#install packages
yarn install

# download and build the docker images, and build the app
docker-compose up -d

# starts nodemon
make serve
```

#### Terminal #2:
```
# run webpack and watch the files
npm run dev

# or
yarn dev
```

> Why `make` instead of `npm`?

These commands indeed do run npm commmands but they run inside the docker
container. This saves you from having to type out the docker commands every time.

## Debugging

Chrome canary now ships with a node debugger button as shown below:

![debugger](https://d3vv6lp55qjaqc.cloudfront.net/items/1i0C2O2n1G2F370V2r2N/%5Ba59661ea9da99b4d5a5739016404bb34%5D_Screenshot%25202017-05-23%252005.05.21.png?X-CloudApp-Visitor-Id=1754851&v=e920ded3)

Click on that, and make sure you have localhost:9229 as a source. A console for
the app should show up when it starts.

## Helpers
```
# Create a production build
npm run build

# Log into the container shell
make shell

# Run node console inside docker
make console
```

# Run tests (one file)
```
make FILE=path/to/file.test.ts test-file
```

# Run all tests
```
make test
```

## Notes

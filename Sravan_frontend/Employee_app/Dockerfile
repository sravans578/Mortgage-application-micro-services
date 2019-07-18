FROM node:11.12.0
RUN npm install sails -g
ENV NODE_ENV development 
WORKDIR Z:/Assignmen/cloud-assignment5/Sravan_frontend/Employee_app/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 1333
CMD sails lift --port 1333
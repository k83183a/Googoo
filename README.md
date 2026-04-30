# Googoo

A minimal scaffold for a ride-hailing platform deployment with Docker Compose and Kubernetes manifests.

## Services included

- `web` — static frontend served by Nginx
- `api` — simple Node.js API service
- `db` — PostgreSQL database

## Docker Compose

Start the platform locally:

```bash
docker-compose up -d
```

Then open:

- frontend: http://localhost:3000
- API: http://localhost:4000/api/status

## Kubernetes

Apply manifests in order:

```bash
kubectl apply -f infrastructure/k8s/namespaces/
kubectl apply -f infrastructure/k8s/secrets/
kubectl apply -f infrastructure/k8s/services/
```

The sample web service is exposed on NodePort `30080`.

### Ingress

To use the ingress, enable the Minikube ingress addon and apply the manifests:

```bash
minikube addons enable ingress
kubectl apply -f infrastructure/k8s/secrets/ingress-tls.yaml
kubectl apply -f infrastructure/k8s/services/ingress.yaml
```

Then add a host entry for `googoo.local` pointing to your Minikube IP:

```bash
echo "$(minikube ip) googoo.local" | sudo tee -a /etc/hosts
```

After that, open:

- `https://googoo.local/` for the web frontend
- `https://googoo.local/api/status` for the API

Because this is a self-signed certificate, your browser may warn about the certificate. You can also verify with curl:

```bash
curl -k -H 'Host: googoo.local' https://$(minikube ip)/api/status
```

## Build and push images for Kubernetes

Build and tag the local service images before applying Kubernetes manifests:

```bash
docker build -t googoo-api:0.1.0 ./backend
docker build -t googoo-web:0.1.0 ./frontend
```

If you are using a cluster that requires a registry, push the images and update the Kubernetes manifests with the correct image names.

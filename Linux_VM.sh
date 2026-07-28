#!/bin/bash

# Defining Variables

RESOURCE_GROUP="FocusFlow-RG"
LOCATION="eastus"
VM_NAME="focusflow-vm"
VNET_NAME="focusflow-vnet"
SUBNET_NAME="focusflow-subnet"
NSG_NAME="focusflow-nsg"
PUBLIC_IP_NAME="focusflow-ip"
NIC_NAME="focusflow-nic"
VM_SIZE="Standard_D2s_v3"
IMAGE="Ubuntu2204"
ADMIN_USER="focusflow"
SSH_KEY="$HOME/.ssh/id_rsa.pub"

# ==============================
# CREATE RESOURCE GROUP
# ==============================

az group create \
    --name $RESOURCE_GROUP \
    --location $LOCATION

# ==============================
# CREATE VIRTUAL NETWORK
# ==============================

az network vnet create \
    --resource-group $RESOURCE_GROUP \
    --name $VNET_NAME \
    --address-prefix 10.0.0.0/16 \
    --subnet-name $SUBNET_NAME \
    --subnet-prefix 10.0.1.0/24

# ==============================
# CREATE PUBLIC IP
# ==============================

az network public-ip create \
    --resource-group $RESOURCE_GROUP \
    --name $PUBLIC_IP_NAME \
    --sku Standard \
    --allocation-method Static

# ==============================
# CREATE NETWORK SECURITY GROUP
# ==============================

az network nsg create \
    --resource-group $RESOURCE_GROUP \
    --name $NSG_NAME

# Allow SSH
az network nsg rule create \
    --resource-group $RESOURCE_GROUP \
    --nsg-name $NSG_NAME \
    --name AllowSSH \
    --priority 1000 \
    --access Allow \
    --protocol Tcp \
    --direction Inbound \
    --destination-port-range 22

# Allow HTTP
az network nsg rule create \
    --resource-group $RESOURCE_GROUP \
    --nsg-name $NSG_NAME \
    --name AllowHTTP \
    --priority 1010 \
    --access Allow \
    --protocol Tcp \
    --direction Inbound \
    --destination-port-range 80

# Allow HTTPS
az network nsg rule create \
    --resource-group $RESOURCE_GROUP \
    --nsg-name $NSG_NAME \
    --name AllowHTTPS \
    --priority 1020 \
    --access Allow \
    --protocol Tcp \
    --direction Inbound \
    --destination-port-range 443

# ==============================
# CREATE NIC
# ==============================

az network nic create \
    --resource-group $RESOURCE_GROUP \
    --name $NIC_NAME \
    --vnet-name $VNET_NAME \
    --subnet $SUBNET_NAME \
    --network-security-group $NSG_NAME \
    --public-ip-address $PUBLIC_IP_NAME

# ==============================
# CREATE VM
# ==============================

az vm create \
    --resource-group $RESOURCE_GROUP \
    --name $VM_NAME \
    --image $IMAGE \
    --size $VM_SIZE \
    --admin-username $ADMIN_USER \
    --authentication-type ssh \
    --ssh-key-values $SSH_KEY \
    --nics $NIC_NAME

# ==============================
# SHOW PUBLIC IP
# ==============================

az vm show \
    --resource-group $RESOURCE_GROUP \
    --name $VM_NAME \
    -d \
    --query publicIps \
    -o tsv
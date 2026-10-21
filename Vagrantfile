# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"   # Ubuntu Server 22.04 LTS
  config.vm.hostname = "garderie-vm"

  # Réseau privé avec IP fixe
  config.vm.network "private_network", ip: "192.168.56.10"

  config.vm.provider "virtualbox" do |vb|
    vb.name   = "garderie-vm"
    vb.memory = 2048
    vb.cpus   = 2
  end

  # Provisioning Ansible exécuté DANS la VM (pas besoin d'Ansible sur l'hôte)
  config.vm.provision "ansible_local" do |ansible|
    ansible.provisioning_path = "/vagrant/ansible"
    ansible.playbook          = "site.yml"
    ansible.install_mode      = "default"   # installe Ansible dans la VM
    ansible.compatibility_mode = "2.0"
    ansible.limit             = "all"
  end
end

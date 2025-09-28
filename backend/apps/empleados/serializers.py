from rest_framework import serializers
from .models import Empleado
from apps.cargos.serializers import CargoSerializer
from apps.prestamos.serializers import PrestamoSerializer
from apps.nomina.serializers import HoraExtraSerializer

class EmpleadoSerializer(serializers.ModelSerializer):
    cargo = CargoSerializer(read_only=True)
    cargo_id = serializers.IntegerField(write_only=True)
    prestamos = PrestamoSerializer(many=True, read_only=True)
    horas_extras = HoraExtraSerializer(many=True, read_only=True)

    class Meta:
        model = Empleado
        fields = [
            'cedula', 'nombres', 'apellidos', 'correo', 'telefono',
            'salario_base', 'cargo', 'cargo_id', 'prestamos', 'horas_extras'
        ]

    def create(self, validated_data):
        cargo_id = validated_data.pop('cargo_id')
        from apps.cargos.models import Cargo
        cargo = Cargo.objects.get(id=cargo_id)
        empleado = Empleado.objects.create(cargo=cargo, **validated_data)
        return empleado

    def update(self, instance, validated_data):
        if 'cargo_id' in validated_data:
            cargo_id = validated_data.pop('cargo_id')
            from apps.cargos.models import Cargo
            instance.cargo = Cargo.objects.get(id=cargo_id)
        return super().update(instance, validated_data)

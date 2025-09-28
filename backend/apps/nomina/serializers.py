from rest_framework import serializers
from .models import TipoHoraExtra, HoraExtra, HistorialNomina

class TipoHoraExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoHoraExtra
        fields = '__all__'

class HoraExtraSerializer(serializers.ModelSerializer):
    tipo_hora = TipoHoraExtraSerializer(read_only=True)
    tipo_hora_id = serializers.CharField(write_only=True)

    class Meta:
        model = HoraExtra
        fields = ['id', 'empleado', 'tipo_hora', 'tipo_hora_id', 'numero_de_horas', 'fecha_registro']

    def create(self, validated_data):
        tipo_hora_id = validated_data.pop('tipo_hora_id')
        tipo_hora = TipoHoraExtra.objects.get(tipo_hora_id=tipo_hora_id)
        hora_extra = HoraExtra.objects.create(tipo_hora=tipo_hora, **validated_data)
        return hora_extra

    def update(self, instance, validated_data):
        if 'tipo_hora_id' in validated_data:
            tipo_hora_id = validated_data.pop('tipo_hora_id')
            instance.tipo_hora = TipoHoraExtra.objects.get(tipo_hora_id=tipo_hora_id)
        return super().update(instance, validated_data)

class HistorialNominaSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialNomina
        fields = '__all__'
